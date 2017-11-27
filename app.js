const express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/*
var index = require('./routes/index');
var users = require('./routes/users');
*/

let app = express();

var FCM = require('fcm-push');
var serverKey = 'AAAAkuoGlSI:APA91bGPh8er9TdmREzHCgRED-Xc43bv8NkLy1VK_q0P2TMkdxIeh1Pp0jxXBsRRAbt7K7q7dFzWw2cx48OVKCSo2ZFT8mcGuQmwOY1val0i_xJpStEPIgybG2Gu_aNItNzjBLvY5XiP';
var fcm = new FCM(serverKey);

// var router = express.Router();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ type: 'application/json'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./routes/routes.js')(app);
/*app.use('/', index);
app.use('/users', users);*/

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


var message = {
    to: 'fFbmjCSXLho:APA91bHT-YTshsaAXQbjmRt1SeH_DGpJXyzwtbjiUZLkAxD9Mb3p7bAqeDeJs0ggMczBVZ_1UHfU1vG6AuRLuEyDsajNpay7ZO1ONX6npU2GC99zvEDAL4KOcgQ7Ejhhw2M1kLgQ88bS', // required fill with device token or topics
    collapse_key: 'your_collapse_key',
    data: {
        your_custom_data_key: 'your_custom_data_value'
    },
    notification: {
        title: 'Title of your push notification',
        body: 'Body of your push notification'
    }
};

/*fcm.send(message, function (err, response) {
    if (err) {
        console.log("Something has gone wrong!");
    } else {
        console.log("Successfully sent with response: ", response);
    }
});*/


module.exports = app;
