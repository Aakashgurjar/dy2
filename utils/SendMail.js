const nodeMailer = require('nodemailer');

exports.sendMail = async(email, title, body) => {

   try{

    let transporter = nodeMailer.createTransport({
  
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "amanbankey8@gmail.com",
        pass: 'vwsn behz qqix ypyb',
    }});    
    

    let info = await transporter.sendMail({
      from: 'code help',
      to: `${email}`,
      subject: `${title}`,
      text: `${body}`,
      html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <h2 style="color: #2c3e50; text-align: center;">📬 ${title}</h2>
        <hr style="border: none; border-top: 1px solid #ddd;">
        <p style="font-size: 16px; color: #333;">Hello,</p>
        <p style="font-size: 16px; color: #333;">${body}</p>
        <p style="font-size: 14px; color: #666; margin-top: 30px;">If you have any questions, feel free to reply to this email.</p>
        <p style="font-size: 14px; color: #666;">– The Code Help Team</p>
        <div style="text-align: center; margin-top: 30px;">
          <a href="https://codehelp.in" target="_blank" style="text-decoration: none; color: white; background: #4CAF50; padding: 10px 20px; border-radius: 5px;">Visit Code Help</a>
        </div>
      </div>
    </div>
  `
    });

    console.log("mail send", info)
    return info;
   }catch(err){
       console.log("err", err.message);
   }

}
