// const nodemailer = require("nodemailer");

// const mailSender = async (email, title, body) => {
//     try{
//             let transporter = nodemailer.createTransport({
//                 host:process.env.MAIL_HOST,
//                 auth:{
//                     user: process.env.MAIL_USER,
//                     pass: process.env.MAIL_PASS,
//                 }
//             })


//             let info = await transporter.sendMail({
//                 from: 'StudyNotion || CodeHelp - by Babbar',
//                 to:`${email}`,
//                 subject: `${title}`,
//                 html: `${body}`,
//             })
//             console.log(info);
//             return info;
//     }
//     catch(error) {
//         console.log(error.message);
//     }
// }


// module.exports = mailSender;





const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,   // e.g., smtp.gmail.com
      port: 587,                     // Gmail SMTP port for TLS
      secure: false,                 // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER, // your email address
        pass: process.env.MAIL_PASS, // your app password
      },
    });

    let info = await transporter.sendMail({
      from: `"StudyNotion || CodeHelp" <${process.env.MAIL_USER}>`, // proper from email format
      to: email,
      subject: title,
      html: body,
    });

    console.log("Mail info:", info);
    return info;
  } catch (error) {
    console.log("Mail sending error:", error.message);
    throw error;  // rethrow to handle it in calling function
  }
};

module.exports = mailSender;
