import { loggerInfo, loggerWarn } from "../helpers/logHandler"

//@ts-ignore
export const errorRoute = (req: express.Request, res: express.Response)=>{
    let { url, method } = req
    loggerWarn.warn(`Ruta ${method} ${url} no implementada`)
    loggerInfo.warn(`Ruta ${method} ${url} no implementada`)
    res.json({data:"Ruta no implementada"})
}