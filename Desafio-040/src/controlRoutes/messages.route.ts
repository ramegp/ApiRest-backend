import { logger, loggerInfo, loggerWarn } from "../helpers/logHandler";
import { DBMongo } from "../utils/DBMongo";

//@ts-ignore
export const buscarMsj = (req: express.Request, res: express.Response) => {
    /* 
    @params id_show ? => params (id del mensaje que queremos buscar)

    si el parametro fue pasado devolvemos un solo msj, sino devolvemos todos los mensajes
    */
    let id_show = req.params.id
    //console.log(id_show);
    
    let db = new DBMongo();
    logger.trace(`Request /menssages metodo ${req.method}`); 
    (id_show)?(db.showMessagesById(id_show).then((data:any)=>{
        loggerInfo.info(`Consulta por un mensaje id ${id_show}`)
        res.json(data)})):(db.showMessages().then((data:any)=>{
            loggerInfo.info(`Consulta por todos los mensajes`)
            res.json(data)}))
}

//@ts-ignore
export const agregarMsj = (req: express.Request, res: express.Response) => {
    /* 
    estructura del mensaje a agregar: 
    {
    user: string,
    msj: string,
    date: string
    }
    @params {user: string,msj: string,date: string} => body
    */
    let msg_to_add = req.body
    logger.trace(`Request /menssages metodo ${req.method}`);
    if (Object.keys(msg_to_add).length != 0) {
        let db = new DBMongo();
        db.addMessage(msg_to_add).then((msg)=>{
            loggerInfo.info(`Se guardo el mensaje en la base de datos`)
            res.json(msg)})
        
    } else {
        loggerInfo.warn(`No se probeyo del mensaje`);
        loggerWarn.warn(`No se probeyo del mensaje`);
        res.json({error:"No se probeyo mensaje"})
    }
    
}

//@ts-ignore
export const borrarMsj = (req: express.Request, res: express.Response) => {
    /* 
    @params id_delete => params
    borrar un msj con id id_delete
    */
    let id_delete = req.params.id
    logger.trace(`Request /menssages metodo ${req.method}`);
    let db = new DBMongo();
        db.removeMessageById(id_delete).then((data:any)=>{
            loggerInfo.info(`Se borro mensaje con id ${id_delete}`)
            res.json(data)
        })
}