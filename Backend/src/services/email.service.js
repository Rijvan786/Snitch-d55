import nodemailer from "nodemailer"
import { config } from "../config/config.js"
console.log(config.GOOGLE_CLIENT_ID,config.GOOGLE_CLIENT_SECRET,config.EMAIL_USER);

const transporter = nodemailer.createTransport({
    service:"gmail",
    family:4,
    auth:{
        clientId:config.GOOGLE_CLIENT_ID,
        clientSecret:config.GOOGLE_CLIENT_SECRET,
        user:config.EMAIL_USER,
        pass:config.EMAIL_PASSWORD
    }
})


transporter.verify().then(()=>{
    console.log("Transporter is ready to send Email");
})
.catch((err)=>{
    console.log(err,"Error is occurred");
})


export async function Sendmail({ from, to, subject = "SNITCH ARCHIVE Notification", text = "", html }) {
    try {
        const mailOptions = {
            from: from || `"SNITCH ARCHIVE" <${config.EMAIL_USER}>`,
            to,
            subject,
            text,
            html
        };
        const info = await transporter.sendMail(mailOptions);
        console.log(`[EmailService] Email sent successfully to ${to}. MessageId: ${info.messageId}`);
        return info;
    } catch (err) {
        console.error(`[EmailService] Failed to send email to ${to}:`, err.message);
        throw err;
    }
}