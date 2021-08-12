import * as express from 'express';
import * as fs from 'fs';

const app = express();
const puerto = 8080;

const server = app.listen(puerto, () => {
    console.log(`servidor inicializado en el puerto ${server.address()}`)
})

app.get('/', (req: any, res: any) => {
    res.json({ msg: 'text' })
})

app.get('/mundo', (req: any, res: any) => {
    res.send('<h1 style="color:red">Hola mundo</h1>')
})


app.get('/productos', (req: any, res: any) => {
    let rand = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min) + min)
    }

    fs.promises.readFile('./productos.txt').then(data => data.toString('utf-8')).then(datos => {
        const json = JSON.parse(datos)

        res.json({ item: json[rand(0, json.length - 1)] })
    })
})

app.get('/items', (req: any, res: any) => {

    const visitas = JSON.parse(fs.readFileSync('./assets/visitas.txt','utf-8'));
    visitas[0].items++;
    fs.writeFileSync('./assets/visitas.txt', JSON.stringify(visitas, null, '\t'));


    fs.promises.readFile('./assets/productos.txt').then(data => data.toString('utf-8')).then(datos => {
        res.json({items:JSON.parse(datos),cantidad:JSON.parse(datos).length})
    })
})

app.get('/item-random',(req:any,res:any)=>{
    let random = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min) + min)
    }

    const visitas = JSON.parse(fs.readFileSync('./assets/visitas.txt','utf-8'));
    visitas[0].item ++;
    fs.writeFileSync('./assets/visitas.txt', JSON.stringify(visitas, null, '\t'));

    fs.promises.readFile('./assets/productos.txt').then(data => data.toString('utf-8')).then(datos => {
        res.json({item:JSON.parse(datos)[random(0,JSON.parse(datos).length)]})
    })

})

app.get('/visitas',(req:any,res:any)=>{
    fs.promises.readFile('./assets/visitas.txt').then(data => data.toString('utf-8')).then(datos => {
        res.json({visitas:JSON.parse(datos)[0]})
    })
})