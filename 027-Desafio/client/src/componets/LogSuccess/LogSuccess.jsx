import React from 'react'
import './LogSuccess.css'
function LogSuccess(props) {
    const handleBtnCerrarLogSuccess = ()=>{
        props.seters.login(false)
    }
    return (
        <div className="container-log-success">
            Bienvenido {props.geters.usuario.username}
            <div className="container-log-success-cerrar" onClick={()=>{handleBtnCerrarLogSuccess()}}>
                Cerrar
            </div>
        </div>
    )
}
export default LogSuccess
