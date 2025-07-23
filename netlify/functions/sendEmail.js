const nodemailer = require('nodemailer');

exports.handler = async function (event, context) {
    try {
        const { email, filename, pdfBase64 } = JSON.parse(event.body);

        if (!email || !pdfBase64 || !filename) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Faltan campos obligatorios' }),
            };
        }

        const buffer = Buffer.from(pdfBase64, 'base64');

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.SMTP_USERNAME,
            to: email,
            subject: 'PDF adjunto',
            html: '<p>Archivo adjunto</p>',
            attachments: [
                {
                    filename: filename,
                    content: buffer,
                    contentType: 'application/pdf',
                },
            ],
        };

        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Correo enviado correctamente' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
