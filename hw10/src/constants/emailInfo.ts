import { emailActionEnum } from './enums';

export const emailInfo = {
    [emailActionEnum.WELCOME]: {
        subject: 'welcome to email templates',
        templateName: 'welcome',
    },

    [emailActionEnum.ACCOUNT_BLOCKED]: {
        subject: 'welcome to email templates',
        templateName: 'accountBlocked',
    },
};
