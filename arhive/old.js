// const url = "mongodb://localhost:27017/";
// const mongoClient = new MongoClient(url, {useNewUrlParser: true});
// const userLogin = req.body.login;
// const userPassword = req.body.password;
// const user = {login: userLogin, password: userPassword};
//
// mongoClient.connect(function (err, client) {
//
//     const db = client.db("usersdb");
//     const collection = db.collection("users");
//
//     if (!req.body) return res.sendStatus(400);
//
//
//     collection.insertOne(user, function (err, result) {
//
//         if (err) return console.log(err);
//     });
//
//     client.close();
//
// });
// res.redirect('/')
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
// const nodemailer = require('nodemailer');

// transporter.sendMail(mailOptions, function (err, info) {
//     if(err)
//         console.log(err);
//     else
//         console.log(info);
// });
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'johndoutesttest@gmail.com',
//         pass: 'johndou321'
//     }
// });

// const mailOptions = {
//     from: 'johndoutesttest@gmail.com', // sender address
//     to: 'milaevsergeywork@gmail.com', // list of receivers
//     subject: 'Email From NodeJs', // Subject line
//     html: '<a href="https://www.google.com.ua/">Google</a><p style="color: #e47593; border: 2px solid black">Hello Pall Now is Rock</p>'// plain text body
// };
///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
// exports.addUser = function(req, res) {
//     if (!req.body) return res.sendStatus(400);
//     const userName = req.body.login;
//     const userAge = req.body.password;
//     const user = new User({ username: userName, password: userAge });
//
//     user.save(function(err) {
//         if (err) return console.log(err);
//         res.redirect("/");
//     });
// };

/////////////
/////////////
/////////////
/////////////
/////////////
// app.get("/email", function(req, res) {
//
//     var transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'johndoutesttest@gmail.com',
//             pass: 'johndou321'
//         }
//     });
//     const mailOptions = {
//         from: 'johndoutesttest@gmail.com', // sender address
//         to: 'poizongroup@gmail.com', // list of receivers
//         subject: 'Email From NodeJs', // Subject line
//         html: '<a href="https://www.google.com.ua/">Google</a><p style="color: #e47593; border: 2px solid black">Hello Pall Now is Rock</p>'// plain text body
//     };
//
//     transporter.sendMail(mailOptions, function (err, info) {
//         if(err)
//             console.log(err);
//         else
//             console.log(info);
//     });
//
//
// });
/////////////////////
/////////////////////d
/////////////////////d
/////////////////////d
// <!--<script>-->
// <!--var form = document.getElementById('form');-->
// <!--var button = document.getElementById('button');-->
// <!--var formName = document.getElementById('name');-->
// <!--var formPassword = document.getElementById('password');-->
//
//
// <!--// form.addEventListener('submit',function (e) {-->
// <!--button.addEventListener('click',function (e) {-->
// <!--e.preventDefault();-->
// <!--var user = {-->
// <!--name: formName.value,-->
// <!--password: formPassword.value-->
// <!--};-->
//
//
// <!--var json = JSON.stringify(user);-->
//
// <!--var request = new XMLHttpRequest();-->
//
//
// <!--request.open("POST", "http://localhost:8080/user");-->
// <!--request.setRequestHeader('Content-Type', 'application/json');-->
// <!--request.send(json);-->
// <!--// window.location = request.responseText.redirectUrl;-->
// <!--window.location = "/admin";-->
// <!--});-->
//
//
// <!--</script>-->
