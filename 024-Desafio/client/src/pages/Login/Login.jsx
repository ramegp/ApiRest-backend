import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

function Login(props) {
  const handleBtnSubmit = (e) => {
    e.preventDefault();
    let user_name = document.getElementById("user-email").value;
    let user_password = document.getElementById("user-password").value;
    if (user_name && user_password) {
      localStorage.setItem('user-name',user_name);
      props.seters.user(user_name);

      axios({
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials:true,
        url: "http://localhost:8080/log/",
        data: {
          user: user_name,
          password: user_password,
        },
      }).then((data)=>{
        if (data.data.status === 'ok') {
          props.seters.admin(data.data.admin)
        }
      });
    } else {
      alert("Falta algun campo");
    }
  };

  return (
    <div className="container container-page-login">
      <h1>Login</h1>
      {props.geters.user ? (
        <h1>Usuario {props.geters.user} se ha logeado</h1>
      ) : (
        <Form className="container-form">
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              id="user-email"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              id="user-password"
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            onClick={(e) => {
              handleBtnSubmit(e);
            }}
          >
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
}

export default Login;
