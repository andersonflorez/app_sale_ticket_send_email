const corsHeaders = {
    'Access-Control-Allow-Origin': '*', // o limita a tu dominio
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

exports.handler = async function (event, context) {
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: corsHeaders,
            body: 'OK',
        };
    }

    try {
        const { email, filename, pdfBase64 } = JSON.parse(event.body);

        if (!email || !pdfBase64 || !filename) {
            return {
                statusCode: 400,
                headers: corsHeaders,
                body: JSON.stringify({ error: 'Faltan campos obligatorios' }),
            };
        }

        const buffer = Buffer.from(pdfBase64, 'base64');

        const htmlPath = path.join(__dirname, 'email_template.html'); // Ajusta el nombre del archivo
        let htmlContent = fs.readFileSync(htmlPath, 'utf8');

        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const mailOptions = {
            from: 'eventos@iglesiamt.com',
            to: email,
            subject: 'Iglesia Misión Transformadora - Yo no pedí nacer Parte 2 - José Ordoñez',
            html: htmlContent,
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
            headers: corsHeaders,
            body: JSON.stringify({ message: 'Correo enviado correctamente' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
