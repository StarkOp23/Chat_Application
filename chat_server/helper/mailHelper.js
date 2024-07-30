const nodemailer = require('nodemailer');


let invitationMail = async (email, name) => {
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "info.soumya23@gmail.com",
            pass: process.env.Gmail_Pass,
        }
    })
    transporter.sendMail({
        from: "info.soumya23@gmail.com",
        to: email,
        subject: "Invitational Mail ",
        text: "Thanks for registering with us",
        html: ` <img src="https://t3.ftcdn.net/jpg/02/20/14/38/240_F_220143804_fc4xRygvJ8bn8JPQumtHJieDN4ORNyjs.jpg">
        <h1> Welcome to the Chat App ${name}. Chat Directly with the people in Chat Room </h1>`
    }, () => {
        console.log("Mail sent successfully")
    })
}



let loginMail = async (email) => {

    let transporter = nodemailer.createTransport({
        service: "Yahoo",
        auth:
        {
            user: "maitisoumyadeep@yahoo.com",
            pass: process.env.Yahoo_Pass,
        }
    })
    transporter.sendMail({
        from: "maitisoumyadeep@yahoo.com",
        to: email,
        subject: "Login Notification ",
        text: "Welcome back to the Chat App",
        html: ` <img src="https://img.freepik.com/free-vector/welcome-back-hand-drawn-lettering-logo_1308-105021.jpg?t=st=1722339699~exp=1722343299~hmac=cb15d95ff90bee9ca651d6480f34ccf351a7a72638aa6d655d8ebd0bd9c6b6cd&w=826">
         <h1> Welcome back to the Chat App ${invitationMail.name}. You are now logged in</h1>`
    }, () => {
        console.log("Login Mail sent successfully")
    })

}



module.exports = {
    invitationMail, loginMail
}