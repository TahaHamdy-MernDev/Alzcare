const nodemailer = require('nodemailer');
const ejs = require('ejs');
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
    let htmlText = '';
    if (obj.template){
      htmlText = await ejs.renderFile(`${__basedir}${obj.template}/html.ejs`, obj.data || null);
    }
  
    let mailOpts = {
      from: 'noreply@yoyo.co',
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
