import nodemailer from 'nodemailer'
import { AppError, HttpCode } from '../errors/errorHandler'
export interface IOptions {
  subject: string
  message: string
  sendTo: string
  sendFrom: string
  replyTo?: string
}
export const sendEmail = async (options: IOptions) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: options.sendFrom, // sender address
    to: options.sendTo, // list of receivers
    subject: options.subject, // Subject line
    html: options.message, // html body
    replyTo: options.replyTo,
  })
  if (!info) {
    throw new AppError({
      httpCode: HttpCode.BAD_REQUEST,
      description: 'There was an issue sending an email to this user. ',
    })
  }
  console.log('Message sent: %s', info)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}
