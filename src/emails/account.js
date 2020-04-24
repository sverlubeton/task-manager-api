const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

sgMail.send({
    to: 'kmalashin@mail.ua',
    from: 'kmalashin@mail.ua',
    subject: 'This is my first creation',
    text: 'I hope this one actually get to you.'
})