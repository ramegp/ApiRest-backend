import nodemailer  from "nodemailer";

import { credencialesEmail } from "./../config";

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: credencialesEmail.user,
        pass: credencialesEmail.pass
    }
})