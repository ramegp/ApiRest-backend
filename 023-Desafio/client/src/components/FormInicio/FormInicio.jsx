import React from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./form.css";

function FormInicio(props) {
  const handleClickBtn = (event) => {
    event.preventDefault();
    let user = {
      id: document.getElementById("user-email").value,
      nombre: document.getElementById("user-nombre").value,
      apellido: document.getElementById("user-apellido").value,
      alias: document.getElementById("user-alias").value,
      edad: document.getElementById("user-edad").value,
    };
    if (user.id && user.nombre && user.apellido && user.alias && user.edad) {
      props.seters.user(user);
      props.seters.name(user);
      props.socket.emit("usuario-conectado", user);
      props.seters.log(true);
    } else {
      alert("Faltan completar datos");
    }
    
  };
  return (
    <div className="container-fluid container-form">
      <Form className="formChatInicio">
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            id="user-email"
            required
          />

          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre"
            id="user-nombre"
            required
          />

          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Apellido"
            id="user-apellido"
            required
          />

          <Form.Label>Alias</Form.Label>
          <Form.Control
            type="text"
            placeholder="Alias"
            id="user-alias"
            required
          />

          <Form.Label>Edad</Form.Label>
          <Form.Control
            type="number"
            placeholder="edad"
            id="user-edad"
            required
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => {
            handleClickBtn(e);
          }}
        >
          Entrar
        </Button>
      </Form>
    </div>
  );
}

export default FormInicio;
