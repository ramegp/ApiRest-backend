import React from 'react'
import './userconectados.css'
function UsuariosConectados(props) {
    return (
        <div className="containerUserConectados">
            <div className="userConectadoImg"></div>
            <div>{props.name}</div>
        </div>
    )
}

export default UsuariosConectados
