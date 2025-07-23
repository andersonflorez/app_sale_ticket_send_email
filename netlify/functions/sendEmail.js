const nodemailer = require('nodemailer');
const multiparty = require('multiparty');

exports.handler = async function (event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    return new Promise((resolve, reject) => {
        const form = new multiparty.Form();

        form.parse(event, async (err, fields, files) => {
            if (err) {
                return resolve({
                    statusCode: 400,
                    body: JSON.stringify({ error: 'Error parsing form data' }),
                });
            }

            const emailTo = fields.email?.[0];
            const htmlBody = '<p>Correo sin cuerpo</p>';
            const file = files.pdf?.[0];

            if (!emailTo || !file) {
                return resolve({
                    statusCode: 400,
                    body: JSON.stringify({ error: 'Email o PDF faltante' }),
                });
            }

            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.SMTP_USERNAME,
                    pass: process.env.SMTP_PASSWORD,
                },
            });

            const mailOptions = {
                from: process.env.SMTP_USERNAME,
                to: emailTo,
                subject: 'Tu archivo PDF adjunto',
                html: htmlBody,
                attachments: [
                    {
                        filename: file.originalFilename,
                        path: file.path,
                        contentType: 'application/pdf',
                    },
                ],
            };

            try {
                await transporter.sendMail(mailOptions);
                resolve({
                    statusCode: 200,
                    body: JSON.stringify({ message: 'Correo enviado exitosamente' }),
                });
            } catch (error) {
                resolve({
                    statusCode: 500,
                    body: JSON.stringify({ error: error.message }),
                });
            }
        });
    });
};