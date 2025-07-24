const nodemailer = require('nodemailer');

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
            html: `
          <!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <title></title>
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    p {
      display: block;
      margin: 13px 0;
    }
  </style>
  <!--[if mso]>
    <noscript>
    <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    </noscript>
    <![endif]-->
  <!--[if lte mso 11]>
    <style type="text/css">
      .mj-outlook-group-fix { width:100% !important; }
    </style>
    <![endif]-->

  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
  <style type="text/css">
    @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
    @import url(https://fonts.googleapis.com/css?family=Cabin:400,700);
  </style>
  <!--<![endif]-->



  <style type="text/css">
    @media only screen and (min-width:480px) {
      .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%;
      }

      .mj-column-per-50 {
        width: 50% !important;
        max-width: 50%;
      }
    }
  </style>
  <style media="screen and (min-width:480px)">
    .moz-text-html .mj-column-per-100 {
      width: 100% !important;
      max-width: 100%;
    }

    .moz-text-html .mj-column-per-50 {
      width: 50% !important;
      max-width: 50%;
    }
  </style>


  <style type="text/css">
    @media only screen and (max-width:479px) {
      table.mj-full-width-mobile {
        width: 100% !important;
      }

      td.mj-full-width-mobile {
        width: auto !important;
      }
    }
  </style>
  <style type="text/css">
    .hide_on_mobile {
      display: none !important;
    }

    @media only screen and (min-width: 480px) {
      .hide_on_mobile {
        display: block !important;
      }
    }

    .hide_section_on_mobile {
      display: none !important;
    }

    @media only screen and (min-width: 480px) {
      .hide_section_on_mobile {
        display: table !important;
      }

      div.hide_section_on_mobile {
        display: block !important;
      }
    }

    .hide_on_desktop {
      display: block !important;
    }

    @media only screen and (min-width: 480px) {
      .hide_on_desktop {
        display: none !important;
      }
    }

    .hide_section_on_desktop {
      display: table !important;
      width: 100%;
    }

    @media only screen and (min-width: 480px) {
      .hide_section_on_desktop {
        display: none !important;
      }
    }

    p,
    h1,
    h2,
    h3 {
      margin: 0px;
    }

    ul,
    li,
    ol {
      font-size: 11px;
      font-family: Ubuntu, Helvetica, Arial;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    @media only screen and (max-width:480px) {
      .mj-column-per-100 {
        width: 100% !important;
        max-width: 100% !important;
      }

      .mj-column-per-100>.mj-column-per-100 {
        width: 100% !important;
        max-width: 100% !important;
      }

      .mj-column-per-50 {
        width: 100% !important;
        max-width: 100% !important;
      }

      .mj-column-per-100>.mj-column-per-50 {
        width: 50% !important;
        max-width: 50% !important;
      }
    }

    .mj-column-per-100 [class^="mj-column-per-"] {
      line-height: normal;
    }
  </style>

</head>

<body style="word-spacing:normal;background-color:#FFFFFF;">


  <div style="background-color:#FFFFFF;">


    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->


    <div style="margin:0px auto;max-width:600px;">

      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->

              <div class="mj-column-per-100 mj-outlook-group-fix"
                style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">

                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
                  width="100%">
                  <tbody>

                    <tr>
                      <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">

                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                          style="border-collapse:collapse;border-spacing:0px;" class="mj-full-width-mobile">
                          <tbody>
                            <tr>
                              <td style="width:600px;" class="mj-full-width-mobile">

                                <img src="https://storage.googleapis.com/topol-web/uploads/688252716b0b2/banner.jpeg"
                                  style="border:0;border-radius:0px 0px 0px 0px;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;"
                                  width="600" height="auto">

                              </td>
                            </tr>
                          </tbody>
                        </table>

                      </td>
                    </tr>

                    <tr>
                      <td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">

                        <div
                          style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1.5;text-align:left;color:#000000;">
                          <p style="font-family: Helvetica, Arial, sans-serif; font-size: 11px; text-align: center;">
                            <span style="font-size: 18px;"><strong>Iglesia Misión Transformadora</strong></span></p>
                          <p style="font-family: Helvetica, Arial, sans-serif; font-size: 11px; text-align: center;">
                            <span style="font-size: 18px;"><strong>Yo no pedí nacer</strong></span></p>
                          <p style="font-family: Helvetica, Arial, sans-serif; font-size: 11px; text-align: center;">
                            <span style="font-size: 18px;"><strong>José Ordoñez</strong></span></p>
                        </div>

                      </td>
                    </tr>

                    <tr>
                      <td align="center"
                        style="font-size:0px;padding:10px 10px;padding-top:10px;padding-right:10px;word-break:break-word;">

                        <p
                          style="font-family: Helvetica, Arial, sans-serif; border-top: solid 1px #000000; font-size: 1px; margin: 0px auto; width: 100%;">
                        </p>

                        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #000000;font-size:1px;margin:0px auto;width:580px;" role="presentation" width="580px" ><tr><td style="height:0;line-height:0;"> &nbsp;
</td></tr></table><![endif]-->


                      </td>
                    </tr>

                    <tr>
                      <td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">

                        <div
                          style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1.5;text-align:left;color:#000000;">
                          <p style="font-family: Helvetica, Arial, sans-serif; font-size: 11px;"><span
                              style="font-size: 14px;">NO HAGAS COPIA DE TU ENTRADA Y NO LA ENVÍES A OTRA PERSONA, UNA
                              VEZ EL CÓDIGO PASE POR </span><span style="font-size: 14px;">NUESTROS LECTORES, SERÁ
                              INHABILITADO PARA NUEVOS INGRESOS.</span></p>
                        </div>

                      </td>
                    </tr>

                    <tr>
                      <td align="center"
                        style="font-size:0px;padding:10px 10px;padding-top:10px;padding-right:10px;word-break:break-word;">

                        <p
                          style="font-family: Helvetica, Arial, sans-serif; border-top: solid 1px #000000; font-size: 1px; margin: 0px auto; width: 100%;">
                        </p>

                        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #000000;font-size:1px;margin:0px auto;width:580px;" role="presentation" width="580px" ><tr><td style="height:0;line-height:0;"> &nbsp;
</td></tr></table><![endif]-->


                      </td>
                    </tr>

                  </tbody>
                </table>

              </div>

              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>

    </div>


    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->


    <div style="margin:0px auto;max-width:600px;">

      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:10px 0px 10px 0px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:300px;" ><![endif]-->

              <div class="mj-column-per-50 mj-outlook-group-fix"
                style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">

                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
                  width="100%">
                  <tbody>

                    <tr>
                      <td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">

                        <div
                          style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1.5;text-align:left;color:#000000;">
                          <p style="font-family: Helvetica, Arial, sans-serif; font-size: 11px;"><span
                              style="font-size: 15px;">Viernes</span><br><strong><span
                                style="font-size: 15px;">17/10/2025</span></strong></p>
                        </div>

                      </td>
                    </tr>

                  </tbody>
                </table>

              </div>

              <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:300px;" ><![endif]-->

              <div class="mj-column-per-50 mj-outlook-group-fix"
                style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">

                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
                  width="100%">
                  <tbody>

                    <tr>
                      <td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">

                        <div
                          style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1.5;text-align:left;color:#000000;">
                          <p style="font-family: Helvetica, Arial, sans-serif; font-size: 11px;"><span
                              style="font-size: 15px;">Ingreso - <strong>6:00 PM</strong></span><br><span
                              style="font-size: 15px;">Evento - <strong>7:00 PM</strong></span></p>
                        </div>

                      </td>
                    </tr>

                  </tbody>
                </table>

              </div>

              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>

    </div>


    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->


    <div style="margin:0px auto;max-width:600px;">

      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:10px 0px 10px 0px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->

              <div class="mj-column-per-100 mj-outlook-group-fix"
                style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">

                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
                  width="100%">
                  <tbody>

                    <tr>
                      <td align="center"
                        style="font-size:0px;padding:10px 10px;padding-top:10px;padding-right:10px;word-break:break-word;">

                        <p
                          style="font-family: Helvetica, Arial, sans-serif; border-top: solid 1px #000000; font-size: 1px; margin: 0px auto; width: 100%;">
                        </p>

                        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #000000;font-size:1px;margin:0px auto;width:580px;" role="presentation" width="580px" ><tr><td style="height:0;line-height:0;"> &nbsp;
</td></tr></table><![endif]-->


                      </td>
                    </tr>

                    <tr>
                      <td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">

                        <div
                          style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1.5;text-align:left;color:#000000;">
                          <p style="font-family: Helvetica, Arial, sans-serif; font-size: 11px;">1. La edad mínima de
                            ingreso al evento es 10 años.<br>2. No está permitido el ingreso de mascotas al
                            evento.<br>3. Presenta tu boleta legible (física o digital). Recuerda que es personal e
                            intransferible.<br>4. La primera boleta que se valide anula copias. No compartas tu PDF ni
                            QR.<br>5. Dirígete a la ubicación seleccionada al momento de realizar la donación. El
                            personal de<br>Logística y Seguridad te direccionará hacia tu ubicación.<br>6. NO ES
                            PERMITIDO GRABAR NI TOMAR REGISTRO FOTOGRÁFICO DURANTE EL<br>EVENTO.<br>7. El personal de
                            Logística y Seguridad puede negar el ingreso o solicitar tu retiro si no<br>cumples las
                            reglas del evento, sin lugar a a reembolso.<br>8. Lee los Términos y Condiciones que se
                            encuentra junto con la boleta.<br>9. Si tienes alguna duda o inquietud puedes escribir a
                            presidencia@iglesiamt.com<br>10. No está permitido el ingreso de bebidas y alimentos.<br>11.
                            No se permite el ingreso de bebidas alcohólicas ni de sustancias psicoactivas.</p>
                        </div>

                      </td>
                    </tr>

                    <tr>
                      <td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">

                        <div
                          style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1.5;text-align:left;color:#000000;">
                          <p style="font-family: Helvetica, Arial, sans-serif; font-size: 11px; text-align: center;">
                            <strong><span
                                style="font-size: 14px; background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);">Organiza:
                                Iglesia Misión Transformadora</span></strong></p>
                        </div>

                      </td>
                    </tr>

                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 10px 10px 10px;word-break:break-word;">


                        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" ><tr><td><![endif]-->
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                          style="float:none;display:inline-table;">
                          <tbody>

                            <tr>
                              <td style="padding:4px;vertical-align:middle;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                  style="background:transparent;border-radius:3px;width:35px;">
                                  <tbody>
                                    <tr>
                                      <td style="font-size:0;height:35px;vertical-align:middle;width:35px;">
                                        <a href="https://www.instagram.com/iglesiamisiontransformadora/" target="_blank"
                                          style="color: #0000EE;">
                                          <img alt="Instagram" height="35"
                                            src="https://s3-eu-west-1.amazonaws.com/ecomail-assets/editor/social-icos/ikony-black/roundedblack/instagram.png"
                                            style="border-radius:3px;display:block;" width="35">
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>

                            </tr>

                          </tbody>
                        </table>
                        <!--[if mso | IE]></td><td><![endif]-->
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                          style="float:none;display:inline-table;">
                          <tbody>

                            <tr>
                              <td style="padding:4px;vertical-align:middle;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                  style="background:transparent;border-radius:3px;width:35px;">
                                  <tbody>
                                    <tr>
                                      <td style="font-size:0;height:35px;vertical-align:middle;width:35px;">
                                        <a href="https://www.youtube.com/@iglesiamisiontransformadora" target="_blank"
                                          style="color: #0000EE;">
                                          <img height="35"
                                            src="https://s3-eu-west-1.amazonaws.com/ecomail-assets/editor/social-icos/ikony-black/roundedblack/youtube.png"
                                            style="border-radius:3px;display:block;" width="35">
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>

                            </tr>

                          </tbody>
                        </table>
                        <!--[if mso | IE]></td><td><![endif]-->
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                          style="float:none;display:inline-table;">
                          <tbody>

                            <tr>
                              <td style="padding:4px;vertical-align:middle;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                  style="background:transparent;border-radius:3px;width:35px;">
                                  <tbody>
                                    <tr>
                                      <td style="font-size:0;height:35px;vertical-align:middle;width:35px;">
                                        <a href="https://www.facebook.com/iglesiamisiontransformadora" target="_blank"
                                          style="color: #0000EE;">
                                          <img alt="Facebook" height="35"
                                            src="https://s3-eu-west-1.amazonaws.com/ecomail-assets/editor/social-icos/ikony-black/roundedblack/facebook.png"
                                            style="border-radius:3px;display:block;" width="35">
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>

                            </tr>

                          </tbody>
                        </table>
                        <!--[if mso | IE]></td></tr></table><![endif]-->


                      </td>
                    </tr>

                  </tbody>
                </table>

              </div>

              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>

    </div>


    <!--[if mso | IE]></td></tr></table><![endif]-->


  </div>

</body>

</html>
            `,
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
