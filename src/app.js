var bodyParser = require('body-parser'),
    express = require("express"),
    url = require('url'),
    Connector = require("./connector"),
    client;
    const helmet = require('helmet');
    const app = express(),
    mongoose = require('mongoose');

// db connection
var option = {
//   useMongoClient: true,
  reconnectTries: Number.MAX_VALUE,// Never stop trying to reconnect
  reconnectInterval: 10000 // Reconnecting every 10seconds
};
mongoose.connect('http://localhost:27017/test-api', option);
mongoose.connection.on('connected', function () {
    console.log('MOngodb connection opened');
});
mongoose.connection.on('error', function (err) {
    console.log('MOngodb connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('MOngodb connection disconnected');
});


function logErrors(err, req, res, next) {
    console.error(err);
    if (err.stack) {
        console.error(err.stack);
    }
    clientErrorHandler(err, req, res);
}



function clientErrorHandler(err, req, res, next) {
    var code = Connector.getErrorCode(err);
    res.send(200, {
        status: code,
        info: err.message || 'Something went really wrong!!!'
    });
}

//app.use(auth.connect(basic));


app.use(helmet());
app.use(bodyParser.urlencoded({
    extended: true
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

app.post('/signup',(req,res,next) => {
    console.log("Body",req.body);
    Connector.saveUserDetails(req, res, next);
});

app.post('/login',(req,res,next) => {
    console.log("Body",req.body);
    Connector.loginUserDetails(req, res, next);
});

app.post('/update',(req,res,next) => {
    console.log("Body",req.body);
    Connector.updateUserDetails(req, res, next);
});

app.post('/view',(req,res,next) => {
    console.log("Body",req.body);
    Connector.getUserDetails(req, res, next);
});

app.use(logErrors);
app.use(clientErrorHandler);

if (!module.parent) {
    console.info("Listening ", process.env.PORT || 5002);
    app.listen(process.env.PORT || 3000);
}



module.exports = app;
