


document.addEventListener('DOMContentLoaded', () => {
    const pug = require('pug')
    const div = document.getElementById('productosContainer');

    socket.on('productos', data => {
        //console.log(data)
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
        for (const prod of data) {
            
            div.innerHTML += pug.render(
                `div(class="producto-card")
    div(class="producto-card-titulo") ${prod.title}
    div(class="producto-card-info")
        div ${prod.price}
        img(class="producto-card-img" src='${prod.thumbnail}', alt="")`)
        
        }
        //console.log(pug.render('p Hola'))
        //console.log(pug.compileFile('cacho.png',data))

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
