

document.addEventListener('DOMContentLoaded', () => {
    const socket = io()
    let contenedor_msj_Dom = document.getElementById('allMsjChat')

    document.getElementById("chat-form").addEventListener('submit', (e) => {
        e.preventDefault()
        //enviar el msj al servidor para guardarlo en el arreglo
        socket.emit('salaChat-msj',sendMsj())
        console.log(sendMsj())
    })

    socket.on('allMsj',(data)=>{
        render(data,contenedor_msj_Dom)
    })
})

const sendMsj = () => {
    return {
        user: document.getElementById("user-email").value,
        msj: document.getElementById("user-txt").value,
        date: new Date()
    }

}

const render = (data,elemDOM) => {
    
    const html = ejs.render(`
        <% productos.forEach( p => { %>
            <div class="chat-msj">
                <div class="chat-msj-usuario"><span>Usuario</span> <%= p.user %> <span class="chat-msj-usuario-hora"> <%= p.date %> </span> </div>
                <div class="chat-msj-contenido"><%= p.msj %></div>
            </div>
        <% }) %>`, {productos: data});

        elemDOM.innerHTML = html
}