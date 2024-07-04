const nodemailer = require('nodemailer');

// 创建一个发送邮件的 transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secure: true,
    auth: {
        user: '1460451166@qq.com',
        pass: 'xtcrwovvhjgnbadb'
    }
});



function sendMail({subject, text}) {
    // 设置邮件的内容
    const mailOptions = {
        from: '1460451166@qq.com',
        to: '1460451166@qq.com',
        subject: subject,
        text: text, 
    };
    // 发送邮件
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

sendMail('sub111', 'text222');


module.exports = { sendMail };
