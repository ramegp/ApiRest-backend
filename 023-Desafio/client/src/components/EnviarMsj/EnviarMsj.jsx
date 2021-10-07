import React from "react";
import { Button } from "react-bootstrap";
import "./enviarmsj.css";


function EnviarMsj(props) {
  const handleClickEnviar = ()=>{
    let txt = document.getElementById('msjUser').value;
    let msj = {
      author:props.user,
      text:txt
    }
    props.socket.emit('msj-user',msj)
    document.getElementById('msjUser').value = '';
  }
  
  return (
    <div className="containerEnviar">
      <input className="containerEnviar-inp" type="text" id="msjUser"/>
      <Button variant="primary" onClick={()=>{handleClickEnviar()}}>Enviar</Button>
    </div>
  );
}

export default EnviarMsj;
