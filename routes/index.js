var express = require('express');
var router = express.Router();

var FCM = require('fcm-push');
var serverKey = 'AAAAkuoGlSI:APA91bGPh8er9TdmREzHCgRED-Xc43bv8NkLy1VK_q0P2TMkdxIeh1Pp0jxXBsRRAbt7K7q7dFzWw2cx48OVKCSo2ZFT8mcGuQmwOY1val0i_xJpStEPIgybG2Gu_aNItNzjBLvY5XiP';
var fcm = new FCM(serverKey);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/addFcm', function(req, res, next) {
    console.log(req.get("fcm_token") + " res:" + res)
    res.send('added');


});



module.exports = router;
