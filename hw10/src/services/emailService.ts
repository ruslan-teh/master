import EmailTemplate from 'email-templates';
import nodemailer from 'nodemailer';
import path from 'path';
import { emailActionEnum } from '../constants';
import { emailInfo } from '../constants/emailInfo';

class EmailService {
    templateRender = new EmailTemplate({
        views: {
            root: path.join(__dirname, '../', 'email-templates'),
        },
    });

    async sendMail(userMail: string, action: emailActionEnum, context = {}) {
        const { subject, templateName } = emailInfo[action];

        Object.assign(context, { frontendUrl: 'https://google.com' });

        const html = await this.templateRender.render(templateName, context);

        const emailTransporter = nodemailer.createTransport({
            from: 'some text',
            service: 'gmail',
            auth: {
                user: 'login',
                pass: 'password',
            },
        });

        return emailTransporter.sendMail({
            to: userMail,
            subject,
            html,
        });
    }
}

export const emailService = new EmailService();
