import React from 'react'
import './Erro.css'
function Error(props) {

    const handleBtnCerrarError = ()=>{
        props.seters.error({status:false,msg:""})
    }
    return (
        <div className="contenedor-error">
            Error: {props.msg}
            <div className="cerrar" onClick={()=>{handleBtnCerrarError()}}>Cerrar</div>
        </div>
    )
}

export default Error
