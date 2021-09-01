export class ApiBackend {
    private express = require("express")
    private app = this.express()
    private server= require("http").Server(this.app);
    private io = require('socket.io')(this.server)
    private api: any;
    private port: Number;
    private api_route: any = [];
    prod :any=[]
    msjSalaChat:any=[]

    constructor(port: Number) {
        this.port = port
        this.api = require('./rutas/productos.route');
        this.app.use(this.express.json())
        this.app.use(this.express.text())
        this.app.use(this.express.urlencoded({ extended: true }))

        this.app.set('views', __dirname + '/views');
        this.app.set('view engine', 'ejs')

        this.app.get('/', (req: any, res: any) => {
            res.sendFile(__dirname + '/public/index.html')
        })

        this.app.use('/api', this.api);
        this.app.use(this.express.static(__dirname + '/public'));

        this.server.listen(this.port, () => {
            //console.log(`servidor inicializado en el puerto ${this.port}`);
        });
        
        for (const i of this.api.stack) {
            this.api_route.push(`http://localhost:${this.port}/api${i.route.path}`)
        }

        this.metodoSocket()
        //console.log(this.api.stack)
    }

    listening = ():Number => {
        return this.port
    }

    routes = ()=>{
        return this.api_route
    }

    private metodoSocket = ()=>{
        this.io.on('connection', (socket : any)=>{
            console.log(`usuario conectado: ${socket.id}`);
            socket.on('msj-user',(data:any)=>{
                console.log(data)
            })
            socket.emit('msj-server','servidor')

            socket.on('prod',(data:any)=>{
                this.prod.push(data)
                console.log(data)
                this.io.emit('productos',this.prod)
            })
            this.io.emit('productos',this.prod)
            this.io.emit('allMsj',this.msjSalaChat)
            socket.on('salaChat-msj',(data:any)=>{
                this.msjSalaChat.push(data)
                this.io.emit('allMsj',this.msjSalaChat)
                console.log(data)
            })
        })
    }


}
interface Producto {
    title: string,
    price: Number,
    thumbnail: string
}


export class Archivo {
    private filePath: string;
    private fs = require('fs');

    constructor(path: string = '') {
        this.filePath = path;
    }

    private obtenerCantidadProductos = () => {
        //Obtiene la cantidad de productos del archivo para generar el id automatico
        let contenido = this.fs.readFileSync(__dirname + `/../assets/${this.filePath}`, 'utf-8')
        return JSON.parse(contenido).length
    }

    readFile =  () => {
        //devuelve los productos del archivo si es que existe
        
        try {
            let contenido = this.fs.readFileSync(__dirname + `/../assets/${this.filePath}`, 'utf-8');
            return JSON.parse(contenido)
        } catch (error) {
            return []
        }
        
    }

    saveFile = (obj: Producto) => {
        //Guarda un producto en un archivo.
        let objSave = { ...obj, id: this.obtenerCantidadProductos() + 1 }
        let products = JSON.parse(this.fs.readFileSync(__dirname + `/../assets/${this.filePath}`, 'utf-8'));
        products.push(objSave)
        this.fs.writeFileSync(__dirname + `/../assets/${this.filePath}`, JSON.stringify(products, null, '\t'))
        return objSave
    }
    deleteFile = (): void => {
        //Borra el archivo con todos los producos
        this.fs.unlink(__dirname + `/${'./text.txt'}`, (error: any) => {
            if (error) {
                console.log(error)

            } else {
                console.log("Deleted")
            }
        })

    }

    
    searchProductId = (num:number) => {
        //obtengo los productos
        let products_Aux = this.readFile();

        if (!products_Aux) {
            //No hay productos devuelvo msj no hay
            return undefined
        } else {
            return products_Aux.find((e:any)=>e.id==num)
        }
    }

    upDateProduct = (id_produc:number,new_product:Producto) => {
        let prod_to_update = this.searchProductId(id_produc);
        if (prod_to_update){
            prod_to_update = {...prod_to_update, title:new_product.title,price:new_product.price,id:id_produc,thumbnail:new_product.thumbnail}
            
            let products = this.readFile();
            products = products.map((p:any)=>{
                if(p.id === id_produc){
                    p = prod_to_update
                }
                return p
            })
            this.fs.writeFileSync(__dirname + `/../assets/${this.filePath}`, JSON.stringify(products, null, '\t'))
            return prod_to_update
        }else{
            return undefined
        }
    }

    deletedProduct = (id_produc:number)=>{
        let existe = this.searchProductId(id_produc)
        if(existe){
            let products = this.readFile();
            let index_deleted:number;
            //products.splice(,1)
            //console.log(products.findIndex((p:any)=>{p.id = id_produc}))
            for (let index = 0; index < products.length; index++) {
                if (products[index].id === id_produc) {
                    index_deleted = index
                } 
            }
            // @ts-ignore
            products.splice(index_deleted,1) 
            this.fs.writeFileSync(__dirname + `/../assets/${this.filePath}`, JSON.stringify(products, null, '\t'))
            return existe
        }else{
            return 'error, no existe el id'
        }
    }

}
/* 
let arch = new Archivo("productos.txt");

console.log(arch.readFile())
arch.deletedProduct(3) */
/* console.log(arch.upDateProduct(2,{"title":"Salamin","price":1000,"thumbnail" : "url foto"}));
console.log(arch.readFile()) */

/* arch.saveFile({
    title: "Cartuchera",
    price: 100,
    thumbnail: 'url'
}); */

//arch.deleteFile();
