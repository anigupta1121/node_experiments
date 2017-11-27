const crypto = require('crypto');
const rand = require('csprng');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const user = require('../config/models');


let smtpTransport = nodemailer.createTransport({
    service :"Gmail",
    auth: {
        user: "anirudh.1413019@kiet.edu",
        pass: "ilovenature.,1"
    }
});

exports.cpass = function(id,opass,npass,callback) {

    var temp1 =rand(160, 36);
    var newpass1 = temp1 + npass;
    var hashed_passwordn = crypto.createHash('sha512').update(newpass1).digest("hex");

    user.find({token: id},function(err,users){

        if(users.length !== 0){

            var temp = users[0].salt;
            var hash_db = users[0].hashed_password;
            var newpass = temp + opass;
            var hashed_password = crypto.createHash('sha512').update(newpass).digest("hex");


            if(hash_db === hashed_password){
                if (npass.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/) && npass.length > 4 && npass.match(/[0-9]/) && npass.match(/.[!,@,#,$,%,^,&,*,?,_,~]/)) {

                    user.findOne({ token: id }, function (err, doc){
                        doc.hashed_password = hashed_passwordn;
                        doc.salt = temp1;
                        doc.save();

                        callback({'response':"Password Sucessfully Changed",'res':true});

                    });
                }else{

                    callback({'response':"New Password is Weak. Try a Strong Password !",'res':false});

                }
            }else{

                callback({'response':"Passwords do not match. Try Again !",'res':false});

            }
        }else{

            callback({'response':"Error while changing password",'res':false});

        }

    });
}

exports.respass_init = function(email,callback) {

    var temp =rand(24, 24);
    user.find({email: email},function(err,users){

        if(users.length !== 0){


            user.findOne({ email: email }, function (err, doc){
                doc.temp_str= temp;
                doc.save();

                var mailOptions = {
                    from: "Anirudh Gupta  <anigupta1121@gmail.com>",
                    to: email,
                    subject: "Reset Password ",
                    text: `Hello ${email} 
                      Code to reset your Password is " ${temp}
                      Thank you!!`          ,

                }

                smtpTransport.sendMail(mailOptions, function(error, response){
                    if(error){

                        console.log(error);
                        callback({'response':"Error While Resetting password. Try Again !",'res':false});

                    }else{

                        callback({'response':"Check your Email and enter the verification code to reset your Password.",'res':true});

                    }
                });
            });
        }else{

            callback({'response':"Email Does not Exists.",'res':false});

        }
    });
}

exports.respass_chg = function(email,code,npass,callback) {


    user.find({email: email},function(err,users){

        if(users.length !== 0){

            var temp = users[0].temp_str;
            var temp1 =rand(160, 36);
            var newpass1 = temp1 + npass;
            var hashed_password = crypto.createHash('sha512').update(newpass1).digest("hex");

            if(temp == code){
                if (npass.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/) && npass.length > 4 && npass.match(/[0-9]/) && npass.match(/.[!,@,#,$,%,^,&,*,?,_,~]/)) {
                    user.findOne({ email: email }, function (err, doc){
                        doc.hashed_password= hashed_password;
                        doc.salt = temp1;
                        doc.temp_str = "";
                        doc.save();

                        callback({'response':"Password Sucessfully Changed",'res':true});

                    });}else{

                    callback({'response':"New Password is Weak. Try a Strong Password !",'res':false});

                }
            }else{

                callback({'response':"Code does not match. Try Again !",'res':false});

            }
        }else{

            callback({'response':"Error",'res':true});

        }
    });
}
