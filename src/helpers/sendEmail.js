const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const { SERVER } = require('../config');


//data = {},
const sendEmail = async (data, to, subject, view) => {
    try {

        const transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: SERVER.PORT,
            auth: {
                user: SERVER.EMAIL_SERVICE,
                pass: SERVER.EMAIL_PASSWORD,
            }
        });

        const path = process.cwd() + '/views/' + view + '.html';

        console.log({1: SERVER.EMAIL_SERVICE, 2: SERVER.EMAIL_PASSWORD});
        
        ///home/eyss/Documentos/ProgramasMariaFernanda/instatow/backend/views/forgotPassword.html
        
        return new Promise((resolve, reject) => {

            fs.readFile(path, { encoding: 'utf-8' },  function (err, html) {
                try {
                    if (err) {
    
                        reject(new Error('ERROR_DATA-Try again, an error occurred while sending the e-mail.'));
    
                    }
    
                    const template = handlebars.compile(html);
    
                    const htmlToSend = template(data);
    
                    const message = {
                        from: {
                            name: 'Instatow',
                            address: SERVER.EMAIL_SERVICE,
                        }, // Sender address
                        to: to,         // List of recipients
                        subject: subject, // Subject line
                        html: "<p>4012</p>"//htmlToSend
                    };
    
                    transport.sendMail(message, function (err, info) {
                        if (err) {
    
                            reject(new Error('ERROR_DATA-Try again, an error occurred while sending the e-mail.'));
                
                        }
    
                        resolve("The email has been sent perfectly.");
    
                    });
    
                    // variables for html with handlebars
                    
                } catch (error) {
                    console.log(error);
                    reject(new Error('ERROR_DATA-Try again, an error occurred while sending the e-mail.'));
            
                }


            });
        });

    } catch (error) {
        console.log(error);
        reject(new Error('ERROR_DATA-Try again, an error occurred while sending the e-mail.'));

    }

}


module.exports = {
    sendEmail
}