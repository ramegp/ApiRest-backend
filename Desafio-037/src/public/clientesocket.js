


document.addEventListener('DOMContentLoaded', () => {
    //const pug = require('pug')
    //const div = document.getElementById('productosContainer');

    socket.on('productos', data => {
        
        const to_render = document.getElementById('my_render');//donde agregamos al dom

        const html = ejs.render(`
        <% productos.forEach( p => { %>
            <div class="producto-card">
                <div class="producto-card-titulo">
                    <%= p.title %>
                </div>
                <div class="producto-card-info">
                    <div>
                        <%= p.price %>
                    </div>
                    <img src="<%= p.thumbnail %>" alt="" class="producto-card-img">
                </div>
            </div>
        <% }) %>`, {productos: data});

        to_render.innerHTML = html

    })
})
const socket = io()


socket.on('msj-server', data => {
    console.log(data)
})

function send() {
    let inp_title = document.getElementById('titleProd').value;
    let inp_price = document.getElementById('priceProd').value;
    let inp_img = document.getElementById('thumbnailProd').value;
    
    let obj = {
        "title": inp_title,
        "price": parseInt(inp_price),
        "thumbnail": inp_img
    }

    console.log(obj)
    socket.emit('prod', obj)

}
