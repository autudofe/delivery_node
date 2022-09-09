const nodemailer = require('nodemailer')

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendMailWithNewPassword(to, password) {
        await  this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'New password from ' + process.env.API_URL,
            text: '',
            html:

                `<div>
                    <h1>Your new password ${password}</h1>
                    <a href="${process.env.API_URL}">${process.env.API_URL}</a>
                </div>`
        })
    }

}

module.exports = new MailService();