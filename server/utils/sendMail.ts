import nodemailer,{Transporter} from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
require('dotenv').config();

interface EmailOptions{
    email:string;
    subject:string;
    template:string;
    data: {[key:string]:any} /*The type {[key: string]: any} in TypeScript is an example of an index signature. This type definition allows you to create objects with dynamic keys, where each key is a string and the value associated with each key can be of any type.

    Here's a breakdown of the components:
    
    {}: This denotes an object type.
    [key: string]: This is the index signature. It means that the object can have properties with keys of type string.
    */
}


const sendMail= async(options:EmailOptions):Promise<void>=>{
    const transporter:Transporter=nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:parseInt(process.env.SMTP_PORT || '587'), 
        service:process.env.SMTP_SERVICE,
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD
        },
    });

    const {email,subject,template,data}=options;

    //get the path of the email template file
    const templatePath=path.join(__dirname,'../mails',template);

    //render email template with  ejs
    const html:string =await ejs.renderFile(templatePath,data);

    const mailOptions={
        from:process.env.SMTP_MAIL,
        to:email,
        subject,
        html
    };

    await transporter.sendMail(mailOptions);
}

export default sendMail;



