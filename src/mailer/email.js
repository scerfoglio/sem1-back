var nodemailer = require('nodemailer')

exports.sendEmail = function(contenidoMail, asunto, destinatorio) {
    console.log("entrando a enviar mail)")
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'testuade1@gmail.com',
            pass: 'npchgrabnvmmxmst'
        }
    })

    let mailOptions = {
        from: 'testuade1@gmail.com',
        to: destinatorio,
        subject: asunto,
        text: contenidoMail
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error){
            console.log(error);
            //res.send(500, err.message);
        } else {
            console.log("Email sent");
            //res.status(200).jsonp(req.body);
        }
    })
}