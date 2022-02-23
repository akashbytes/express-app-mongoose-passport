const nodemailer = require('nodemailer');
async function sendEmail(mailData) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: "akashbytes006@gmail.com",
            pass: "Anomla@1234@#$"
        }
    });
    try{
        mailData.from = "akashbytes006@gmail.com";
        await transporter.sendMail(mailData);
    }catch(err){
        console.log('Mail Error : ',err);
    }
}
module.exports = {
    sendEmail
};