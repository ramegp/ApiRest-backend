import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./Login.css";

function Login(props) {
  const [singUp, setsingUp] = useState(true);
  const [singUpUsername, setsingUpUsername] = useState(null);
  const [singUpEmail, setsingUpEmail] = useState(null);
  const [singUpPass, setsingUpPass] = useState(null);

  const [singInEmail, setsingInEmail] = useState(null);
  const [singInPass, setsingInPass] = useState(null);


  const handleSingIn = () => {
    if (singInEmail && singInPass) {
        console.log(`email ${singInEmail} pass ${singInPass}`);
        props.seters.usuario({name:"",username:singInEmail,pass:singInPass});
        let obj_user = {
            "username":singInEmail,
            "password":singInPass
        }
        axios({
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials:true,
          url: "http://localhost:8080/sing/in",
          data: {
            username:singInEmail,
            password:singInPass
          },
        }).then((data)=>{
          let keys = Object.keys(data.data)
          if (keys.includes('error')) {
            props.seters.error({status:true,msg:data.data.error});
            props.seters.login(false);
          } else {
            props.seters.error({status:false,msg:''});
            props.seters.token(data.data.token)
            props.seters.login(true);
            console.log("Todo OK....");
          }
        });
        setsingInEmail(null)
        setsingInPass(null)

        document.getElementById('singin-email').value = "";
        document.getElementById('singin-pass').value = "";
    } else {
        alert("Faltan completar datos")
    }
  };
  const handleSingUp = () => {
    if (singUpEmail && singUpUsername && singUpPass) {
        console.log(`nombre ${singUpUsername} email ${singUpEmail} pass ${singUpPass}`);
        props.seters.usuario({name:singUpUsername,username:singUpEmail,pass:singUpPass});

        axios({
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials:true,
          url: "http://localhost:8080/sing/up",
          data: {
            username:singUpEmail,
            password:singUpPass
          },
        }).then((data)=>{
          let keys = Object.keys(data.data)
          if (keys.includes('error')) {
            props.seters.error({status:true,msg:data.data.error});
            props.seters.login(false);
          } else {
            props.seters.error({status:false,msg:''});
            props.seters.token(data.data.token)
            props.seters.login(true);
            console.log("Todo OK....");
          }
        });

        setsingUpUsername(null)
        setsingUpEmail(null)
        setsingUpPass(null)
        document.getElementById('singup-name').value = "";
        document.getElementById('singup-email').value = "";
        document.getElementById('singup-pass').value = "";
    } else {
        alert("Faltan completar datos")
    }
  };
  return (
    <div>
      <div className="container contenedor-formularios">
        {singUp ? (
          <div className="form-singin" id="singin">
            <h1 class="titulo-formulario">SingUp</h1>
            <div class="form-holder">
              <input
                type="text"
                class="input"
                placeholder="Name"
                id="singup-name"
                onChange={(e)=>{setsingUpUsername(e.target.value)}}
              />
              <input
                type="email"
                class="input"
                placeholder="Email"
                id="singup-email"
                onChange={(e)=>{setsingUpEmail(e.target.value)}}
              />
              <input
                type="password"
                class="input"
                placeholder="Password"
                id="singup-pass"
                onChange={(e)=>{setsingUpPass(e.target.value)}}
              />
              <Button
                className="btn-submit"
                onClick={() => {
                  handleSingUp();
                }}
              >
                SingUp
              </Button>
            </div>
            <p>
              Ya tiene usuario?{" "}
              <span
                className="span-click"
                onClick={() => {
                  setsingUp(false);
                }}
              >
                SingIn
              </span>
            </p>
          </div>
        ) : (
          <div className="form-singup" id="singup">
            <h1 class="titulo-formulario">SingIn</h1>
            <div class="form-holder">
              <input type="email" class="input" placeholder="Email" id="singin-email" onChange={(e)=>{setsingInEmail(e.target.value)}}/>
              <input type="password" class="input" placeholder="Password" id="singin-pass" onChange={(e)=>{setsingInPass(e.target.value)}}/>
              <Button
                className="btn-submit"
                onClick={() => {
                  handleSingIn();
                }}
              >
                SingIn
              </Button>
            </div>
            <p>
              No tiene usuario?{" "}
              <span
                className="span-click"
                onClick={() => {
                  setsingUp(true);
                }}
              >
                SingUp
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
