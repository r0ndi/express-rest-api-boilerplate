import nodemailer from "nodemailer";
import mailerConfig from "../../configs/mailer.config";
import MailType from "../../types/mail.type";

class MailerService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport(mailerConfig);
    }

    public sendMail = async (mail: MailType): Promise<boolean> => {
        try {
            const mailResult = await this.transporter.sendMail(mail);
            return !!mailResult.messageId;
        } catch (error) {
            return false;
        }
    }
}

export default MailerService;
