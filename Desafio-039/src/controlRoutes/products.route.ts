import { logger, loggerInfo } from "../helpers/logHandler";
import { DBMongo } from "../utils/DBMongo";

//@ts-ignore
export const buscarProducto = async (req: express.Request, res: express.Response) => {
    /* 
    @params id_show => params para buscar producto por id
    @params nombre => query busca producto por nombre
    @params preciomax => query busca producto por precio maximo
    @params codigo => query busca producto por codigo
    @params stockmax =< query busca producto por stock maximo
    
    Busca producto segun el parametro pasado por query o params en caso de ser id
    */
    let id_show = req.params.id
    let {nombre, preciomax, preciomin, codigo, stockmax, stockmin} = req.query
    let db = new DBMongo();
    
    if (id_show) {
        loggerInfo.info(`Request /products por id ${id_show}`)
        db.findById(id_show).then((data:any)=>{res.json(data)})
    } else {
        if (nombre) {
            loggerInfo.info(`Request /products por nombre ${nombre}`)
            db.findByName(nombre.toString()).then((data:any)=>{res.json(data)})
        } else {
            if (codigo) {
                loggerInfo.info(`Request /products por codigo ${codigo}`)
                db.findByCode(codigo.toString()).then((data:any)=>{res.json(data)})
            } else {
                if (preciomax && stockmax) {
                    
                    (preciomin)?(preciomin = preciomin.toString()):(preciomin = '0');
                    (stockmin)?(stockmin = stockmin.toString()):(stockmin = '0');
                    loggerInfo.info(`Request /products por precio y stock [$ ${preciomax}, ${stockmax}] `)
                    db.findByPriceStock(parseInt(preciomax.toString()),parseInt(preciomin),parseInt(stockmax.toString()),parseInt(stockmin)).then((data:any)=>{res.json(data)})
                    
                } else {
                    if (stockmax) {
                        (stockmin)?(stockmin = stockmin.toString()):(stockmin = '0')
                        loggerInfo.info(`Request /products por stock ${stockmax}`)
                        db.findByStock(parseInt(stockmax.toString()),parseInt(stockmin)).then((data:any)=>{res.json(data)})
                    } else {
                        if (preciomax) {
                            (preciomin)?(preciomin = preciomin.toString()):(preciomin = '0');
                            loggerInfo.info(`Request /products por precio ${preciomax}`)
                            db.findByPrice(parseInt(preciomax.toString()),parseInt(preciomin)).then((data:any)=>{res.json(data)})
                        } else {
                            loggerInfo.info(`Request /products`)
                            db.imprimir().then((data:any)=>{res.json(data)})
                        }
                        
                    }
                }
            }
        }
    }
    
}
//@ts-ignore
export const agregarProducto =(req: express.Request, res: express.Response) => {
    /* 
    let producto_agregar = {
                title: "pan dulce",
                description: "Escuadra de color rosa",
                stock: 400,
                codigo: "ES-55",
                price: 45,
                thumbnail: "https://cdn2.iconfinder.com/data/icons/bakery-kitchen-3/512/soda-bread-baking-512.png"
            }
    */
    let obj = req.body
    
    let db = new DBMongo();
    db.addProd(obj).then((prod) => {res.json(prod)})
}

//@ts-ignore
export const borrarProducto =  (req: express.Request, res: express.Response) => {
    /* 
    @params id_delete => params 
    borra un producto de la bd de los producto por id
    */
    let id_delete = req.params.id
    logger.trace(`Request /products metodo ${req.method}`);
    let db = new DBMongo();
    db.removeById(id_delete).then((data:any)=>{
        loggerInfo.info(`Se borro producto id ${id_delete}`)
        res.json(data)
    })
}

//@ts-ignore
export const actualizarProducto = (req: express.Request, res: express.Response) => {
    /* 
    @params id_produc => params id del producto a actualizar
    @params {"title": req.body.title,
        "price": req.body.price,
        "thumbnail": req.body.thumbnail,
        "codigo": req.body.codigo,
        "stock": req.body.stock,
        "description": req.body.description,
        "timestamp": req.body.timestamp}

    */
    let id_produc = req.params.id
    let db = new DBMongo();

    let prod_to_update = {
        "title": req.body.title,
        "price": req.body.price,
        "thumbnail": req.body.thumbnail,
        "codigo": req.body.codigo,
        "stock": req.body.stock,
        "description": req.body.description,
        "timestamp": req.body.timestamp
    }

    
    db.upDate(id_produc, prod_to_update).then((data: any) => {
        res.json(data)
    })
}