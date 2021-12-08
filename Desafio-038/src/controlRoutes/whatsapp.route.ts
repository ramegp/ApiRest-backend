import { loggerInfo } from "../helpers/logHandler"
import { client } from "../helpers/twilioHandler"

//@ts-ignore
export const enviarWhatsapp = (req: express.Request, res: express.Response)=>{
    let {tel, msg} = req.query
    if (tel && msg) {
        client.messages.create({
            body: `${msg}`,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:${tel}`
            })
            .then(message => loggerInfo.info(`Se envio whatsapp al usuario ${tel}  ${message.sid}`))
            .catch(console.log) 
        res.json({msg:"ok"})
        
    } else {
        res.json({error:"Faltan parametros query"})
    }
}