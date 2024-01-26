const nodemailer = require('nodemailer');
const ejs = require('ejs');
const { log } = require('winston');
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.NODE_MAILER_EMAIL,
      pass: process.env.NODE_MAILER_PASSWORD,
    },
  });
  const sendMail =  async (obj) => {
    
    if (!Array.isArray(obj.to)) {
      obj.to = [obj.to];
    }
  console.log(obj.data);
    let htmlText = '';
    if (obj.template){
      htmlText = await ejs.renderFile(`${__basedir}${obj.template}/html.ejs`, obj.data || null);
    }
  
    let mailOpts = {
      from: obj.from || 'noreply@yoyo.co',
      subject: obj.subject || 'Sample Subject',
      to: obj.to,
      cc: obj.cc || [],
      bcc: obj.bcc || [],
      html: htmlText,
      attachments: obj.attachments || []
    };
    return transporter.sendMail(mailOpts);
  };
  
  module.exports = { sendMail };

//   async function senMail(templateData, toAddress, subject, file) {
//     const emailTemplate = fs.readFileSync(`./src/views/email/${file}`, 'utf8');
//     const renderedHTML = ejs.render(emailTemplate, templateData);
//     const mailOptions = {
//       from: 'noreply@yoyo.co',
//       to: toAddress,
//       subject,
//       html: renderedHTML,
//     };
//     return new Promise((resolve, reject) => {
//       transporter.sendMail(mailOptions, (err, info) => {
//         if (err) {
//             console.log(`Error sending ${subject} email to ${toAddress} err:, ${err}`);
//           reject(err);
//         } else {
//             console.log(`${subject} email successfully sent to ${toAddress} res:, ${info.response}`);
//           resolve(true);
//         }
//       }); 
//     });
//   }
//   const sendVerificationCode = async (data) => {
//     const { toAddress, templateData } = data;
//     const subject = "Password Reset";
//     const file = 'ResetPassword/html.ejs';
//     return senMail(templateData, toAddress, subject, file)
//   }
//   module.exports = { sendVerificationCode };