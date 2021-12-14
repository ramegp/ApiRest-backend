import nodemailer  from "nodemailer";
import { UsuarioPassport } from "../utils/Interfaces";

import { credencialesEmail } from "./../config";
import { loggerError, loggerInfo } from "./logHandler";

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: credencialesEmail.user,
        pass: credencialesEmail.pass
    }
})

export const avisoInicioSesionEmail = (user:UsuarioPassport) => {
    const mailOptions = {
        from: 'Servidor Node.js',
        to: user.user,
        subject: 'Inicio de sesion',
        html: `<h1 style="color: grey;">Inicio de sesion  ${(new Date).toDateString()}</h1>`
        
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            loggerError.error(`${err}`);
            
            return err
        }
        loggerInfo.info(`Se envio email al usuario ${user.user}`)
    })
}