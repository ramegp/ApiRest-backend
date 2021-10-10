import React from 'react'
import { Col } from 'react-bootstrap'
import './Mensajes.css'
function MensajesUsuarios(props) {
    return (
        <Col md="auto" className="MensajeUsuario">
            <div className="MensajeUsuarioDiv"><span className="MensajeUsuarioSpan">Usuario</span>{props.name}</div>
            <div className="MensajeUsuarioDiv"><span className="MensajeUsuarioSpan">Mensaje</span>{props.msg}</div>
            <div className="MensajeUsuarioFecha"><span>Fecha: {props.date}</span></div>
        </Col>
    )
}

export default MensajesUsuarios
