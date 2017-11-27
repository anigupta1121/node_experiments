const chngpass = require('../config/chngpass');
const register = require('../config/register');
const login = require('../config/login');

const session = require('express-session');


module.exports = function (app) {
    app.use(session({secret: "Shh, its a secret!"}));

    app.get('/', function (req, res) {

        res.end("Node-Login-Register-Project");
    });

    app.post('/login', function (req, res) {
        console.log(req.body);
        let email = req.body.Email;
        let password = req.body.Password;

        login.login(email, password, function (found) {
            console.log(found);
            res.json(found);
        });
    });


    app.post('/register', function (req, res) {
        console.log(req.body);
        let email = req.body.Email;
        let password = req.body.Password;


        register.register(email, password, function (found) {
            console.log(found);
            res.json(found);
        });
    });


    app.post('/api/chngpass', function (req, res) {
        var id = req.body.id;
        var opass = req.body.oldpass;
        var npass = req.body.newpass;

        chngpass.cpass(id, opass, npass, function (found) {
            console.log(found);
            res.json(found);
        });
    });


    app.post('/api/resetpass', function (req, res) {

        let email = req.body.Email;

        chngpass.respass_init(email, function (found) {
            console.log(found);
            //res.json(found);
            if (!req.session.email) {
                req.session.email = email;
            }

            res.redirect("http://localhost:63343/untitled4/views/VerifyCode.html?=" + email);
        });
    });


    app.post('/api/resetpass/chg', function (req, res) {

        let email = req.session.email;
        console.log(email);
        let code = req.body.code;
        let npass = req.body.newpass;

        chngpass.respass_chg(email, code, npass, function (found) {
            console.log(found);
            res.json(found);
        });
    });


};