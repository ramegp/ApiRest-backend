import twilio from 'twilio';
import { UsuarioPassport } from '../utils/Interfaces';
import { credencialesTwilio } from './../config'
import { loggerInfo } from './logHandler';


export const client = twilio(credencialesTwilio.accountSid, credencialesTwilio.authToken);

export const avisoInicioSesionSMS = (user:UsuarioPassport) => {
    
    client.messages.create({
        body: `Hola inicio de sesion ${user.user}`,
        from: credencialesTwilio.number,
        //@ts-ignore
        to: `+${user.phone}`
  })
  .then(message => loggerInfo.info(`Se envio sms al usuario ${user.user} con idSMS ${message.sid}`))
  .catch(console.log)
}


export const avisoInicioSesionWhatsapp = (user:UsuarioPassport)=>{

    client.messages.create({
        body: `Has iniciado sesion`,
        mediaUrl: ['https://img.europapress.es/fotoweb/fotonoticia_20191227171120_1200.jpg'],
        from: 'whatsapp:+14155238886',
        to: `whatsapp:+${user.phone}`
        })
        .then(message => loggerInfo.info(`Se envio whatsapp al usuario ${user.user}  ${message.sid}`))
        .catch(console.log) 
}