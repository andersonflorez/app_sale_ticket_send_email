const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

exports.handler = async function (event, context, callback) {
  if (event.httpMethod === 'OPTIONS') {
    return callback(null, {
      statusCode: 200,
      headers: corsHeaders,
      body: 'OK',
    });
  }

  try {
    const { email, filename, pdfBase64 } = JSON.parse(event.body);

    if (!email || !pdfBase64 || !filename) {
      return callback(null, {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Faltan campos obligatorios' }),
      });
    }

    const buffer = Buffer.from(pdfBase64, 'base64');

    // Leer el HTML desde archivo
    const htmlPath = path.join(__dirname, 'email_template.html');
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');

    // Reemplazar la referencia de imagen por cid
    htmlContent = htmlContent.replace(/banner\.jpeg/g, 'cid:bannerCID');

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
        {
          filename: 'banner.jpeg',
          path: path.join(__dirname, 'banner.jpeg'),
          cid: 'bannerCID', // Debe coincidir con el cid usado en el HTML
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    callback(null, {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Correo enviado correctamente' }),
    });
  } catch (error) {
    callback(null, {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: error.message }),
    });
  }
};

// Activar como función background
exports.config = {
  type: 'background',
};
