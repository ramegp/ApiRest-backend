import { loggerInfo } from "../helpers/logHandler"

//@ts-ignore

export const datos = (req: express.Request, res: express.Response) => {
    let { url, method } = req
    loggerInfo.info(`Request a la ruta /datos por el metodo ${method}`)
    
    res.json({
        argumentos:process.argv.slice(2),
        SO:process.platform,
        version_node:process.version,
        uso_memoria:process.memoryUsage(),
        path_ejecucion:__filename,
        pid:process.pid,
        carpeta:process.cwd(),
        worker:process.pid,
        date:new Date().toLocaleString()
    })
}
