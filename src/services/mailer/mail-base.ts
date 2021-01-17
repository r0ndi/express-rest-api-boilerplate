import appConfig from "../../configs/app.config";
import MailType from "../../types/mail.type";

abstract class MailBase {
    protected mailData: any;

    constructor(mailData: any) {
        this.mailData = mailData;
    }

    protected abstract getTo(): string;

    protected abstract getSubject(): string;

    protected abstract getText(): string;

    protected abstract getHtml(): string;

    public getFrom = (): string => {
        return `"${appConfig.MAILER_MAIL_FROM_NAME}" <${appConfig.MAILER_MAIL_FROM}>`;
    }

    public getMail = (): MailType => {
        return {
            from: this.getFrom(),
            to: this.getTo(),
            subject: this.getSubject(),
            text: this.getText(),
            html: this.getHtml(),
        };
    }
}

export default  MailBase;
