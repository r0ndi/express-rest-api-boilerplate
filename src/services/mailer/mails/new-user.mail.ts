import MailBase from "../mail-base";

class NewUserMail extends MailBase {
    protected getTo = (): string => {
        return this.mailData?.user?.email;
    }

    protected getSubject = (): string => {
        return "Hello ✔";
    }

    protected getText = (): string => {
        return "Hi, what's up?";
    }

    protected getHtml = (): string => {
        return "<b>Hi, what's up?</b>";
    }
}

export default NewUserMail;
