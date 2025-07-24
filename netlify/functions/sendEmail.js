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
            subject: 'Iglesia Misión Transformadora - Yo no pedí nacer - Jose Ordoñez',
            html: '<style type="text/css">p.p1{margin:0;font:12px Helvetica;color:#000}</style><p class="p1">1. Edad minima de ingreso al evento es 10 a&ntilde;os.</p><p class="p1">2. No esta permitido el ingreso de mascotas al evento.</p><p class="p1">3. Presenta tu boleta legible (f&iacute;sica o digital). Recuerda que es personal e intransferible.</p><p class="p1">4. La primera boleta que se valide anula copias. No compartas tu PDF ni QR.</p><p class="p1">5. Dir&iacute;gete a la ubicaci&oacute;n seleccionada al momento de realizar la donaci&oacute;n. El personal de</p><p class="p1">Log&iacute;stica y Seguridad te direccionar&aacute; hacia tu ubicaci&oacute;n.</p><p class="p1">6. NO ES PERMITIDO GRABAR NI TOMAR REGISTRO FOTOGR&Aacute;FICO DURANTE EL</p><p class="p1">EVENTO.</p><p class="p1">7. El personal de Log&iacute;stica y Seguridad puede negar el ingreso o solicitar tu retiro si no</p><p class="p1">cumples las reglas del evento, sin lugar a a reembolso.</p><p class="p1">8. Lee los T&eacute;rminos y Condiciones que se encuentra junto con la boleta.</p><p class="p1">9. Si tienes alguna dudo o inquietud puedes escribir a presidencia@iglesiamt.com</p>',
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
