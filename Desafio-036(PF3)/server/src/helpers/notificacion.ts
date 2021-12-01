import { use } from "chai";
import { administrador } from "../config";
import { UsuarioPassport } from "../utils/Interfaces";
import { loggerInfo } from "./logHandler";
import { client } from "./twilioHandler";


export const notificacionUsuarioRegistrado = (user:UsuarioPassport) => {
    client.messages.create({
        body: `Usuario registrado:
        email:${user.user},
        name:${user.name}
        address:${user.address},
        age:${user.age},
        phone:${user.phone}
        `,
        mediaUrl: ['https://img.europapress.es/fotoweb/fotonoticia_20191227171120_1200.jpg'],
        from: 'whatsapp:+14155238886',
        to: `whatsapp:${administrador.phone}`
        })
        .then(message => loggerInfo.info(`Se envio whatsapp al usuario ${user.user}  ${message.sid}`))
        .catch(console.log) 
}

export const notificacionCompra = (detalle:any) => {
    client.messages.create({
        body: `Compra: ${detalle.user}
        fecha:${detalle.fecha}
        productos: ${detalle.productos}
        total:$ ${detalle.total}`,
        mediaUrl: ['https://img.europapress.es/fotoweb/fotonoticia_20191227171120_1200.jpg'],
        from: 'whatsapp:+14155238886',
        to: `whatsapp:${administrador.phone}`
        })
        .then(message => loggerInfo.info(`Se envio whatsapp al administrador, notificacion de compra`))
        .catch(console.log)
}