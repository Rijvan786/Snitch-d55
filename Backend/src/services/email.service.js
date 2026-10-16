// import nodemailer from "nodemailer"
// import { config } from "../config/config.js"

// const transporter = nodemailer.createTransport({
//     service:"gmail",
//     family:4,
//     auth:{
//         clientId:config.GOOGLE_CLIENT_ID,
//         clientSecret:config.GOOGLE_CLIENT_SECRET,
//         user:config.EMAIL_USER,
//         pass:config.EMAIL_PASSWORD
//     }
// })


// transporter.verify().then((res)=>{


//     console.log("Transporter is ready to send Email");
// })
// .catch((err)=>{
//     console.log(err,"Error is occurred");
// })


// export async function Sendmail({ from, to, subject = "SNITCH ARCHIVE Notification", text = "", html }) {
//     try {
//         const mailOptions = {
//             from: from || `"SNITCH ARCHIVE" <${config.EMAIL_USER}>`,
//             to,
//             subject,
//             text,
//             html
//         };
//         const info = await transporter.sendMail(mailOptions);
//         console.log(`[EmailService] Email sent successfully to ${to}. MessageId: ${info.messageId}`);
//         return info;
//     } catch (err) {
//         console.error(`[EmailService] Failed to send email to ${to}:`, err.message);
//         throw err;
//     }
// }


import emailjs from "@emailjs/nodejs"
import { config } from "../config/config.js"

export async function SendMailDynamicContent({
         subject_line,email,dynamic_html_content}){
          
 const templateParams ={
        subject_line:subject_line,
        to_email:email,
        dynamic_html_content:dynamic_html_content
    }
       await emailjs.send(
        config.EMAILJS_SERVICE_ID,
        config.EMAILJS_TEMPLATE_ID,
        templateParams,
        {
            publicKey:config.EMAILJS_PUBLIC_KEY,
            privateKey:config.EMAILJS_PRIVATE_KEY
            
        }).then((res)=>{
        console.log("Successfully sent email",res.status,res.text)
})
    .catch((error)=>{
        console.log(`Sending mail Error occurred `,error);
    })

}

