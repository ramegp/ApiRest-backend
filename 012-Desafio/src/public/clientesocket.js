
import { renderFile } from 'pug-cli';

document.addEventListener('DOMContentLoaded', () => {

    const div = document.getElementById('productosContainer');

    socket.on('productos', data => {
        console.log(data)
        
        console.log(renderFile('cacho.png',data))

    })
})
const socket = io()


socket.on('msj-server', data => {
    console.log(data)
})

function send() {
    let inp_title = document.getElementById('title').value;
    let inp_price = document.getElementById('price').value;
    let inp_img = document.getElementById('img').value;

    let obj = {
        "title": inp_title,
        "price": parseInt(inp_price),
        "thumbnail": inp_img
    }
    console.log(obj)
    socket.emit('prod', obj)

}
