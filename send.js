const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "karimsardouk727@gmail.com",
    pass: "xtxhpzqclmhiklcd",
  },
});
const mailOptions   = {
    from:"karimsardouk727@gmail.com",
    to:"karimsardouk727@gmail.com",
    subject:"Nodemailer Test",
    text:"Test sending Gmail using Node JS"
};
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    } else{
        console.log("Email sent succesfully: "+ info.response);
    }
});