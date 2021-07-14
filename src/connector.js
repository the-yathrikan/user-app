
const aes = require('./services/aes');
let usermodel = require('./models/userModel');
var validator = require('validator');
/**
* Connector
*/

const Connector = {

    saveUserDetails(req, res, next) {
            console.log("Body for Save Contact Details",JSON.stringify(req.body));
            let username = req.body.username;
            let address = req.body.address;
            let email = req.body.email;
            let password = req.body.password;
            let pwd  = password ? aes.encrypt(password) : '';
            let userModel = new usermodel();
            userModel.username = username;
            userModel.address = address;
            userModel.email = email;
            userModel.password = pwd;
            if(validator.isEmail(email)){
                usermodel.find({email:email},(err,data_1)=>{
                    if(err){
                        console.log("error");
                    }
                    else{
                        if(data && data.length > 0){
                            res.json({
                                status:409,
                                info:'already exist'
                            });
                        }else{
                            userModel.save(userModel, function (error, data) {
                                if (error) {
                                    res.json({status:400,
                                    info: 'error'})
                                } else {
                                    res.json({status:200,
                                    info: 'ok'})
                                }
                            });
                        }
                    }
                })
                
        }       
    },
    loginUserDetails(req, res, next){
        let query = {};
        query.username = req.body.username;
        query.password = aes.encrypt(req.body.password);
        usermodel.find(query,(err,data)=>{
            if(err){
                console.log("err");
            }else{
                if(data && data.length > 0){
                    res.json({
                        status:200,
                        info:'successfully logged in',
                        data: data
                    })
                }else{
                    res.json({
                        status:400,
                        info:'something went wrong'
                    })
                }
            }
        })
    },
    updateUserDetails(req, res, next){
        let query = {};
        query.username = req.body.username;
        let update = {
            username : req.body.new_username,
            password: req.body.new_password,
            address: req.body.new_adderss
        }
        usermodel.update(query,update,(err,data)=>{
            if(err){
                console.log("error");
            }else{
                res.json({
                    info:'updated successfully',
                    status:200
                })
            }
        })
    },
    getUserDetails(req, res, next){
        let query = {};
        query.username = req.body.username;
        usermodel.find(query,(err,data)=>{
            if(err){
                console.log("error");
            }else{
                if(data && data.length > 0){
                    res.json({
                        info:'updated successfully',
                        status:200,
                        data:data
                    })
                }else{
                    res.json({
                        info:'No data',
                        status:400,
                        data:[]
                    })
                }
                
            }
        })
    }
}
module.exports = Connector;
