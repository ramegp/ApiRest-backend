import logo from "./logo.svg";
import "./App.css";
import Login from "./componets/Login/Login";
import { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import Error from "./componets/Error/Error";
import LogSuccess from "./componets/LogSuccess/LogSuccess";

function App() {
  const [usuario, setusuario] = useState({ name: "", username: "", pass: "" });

  const [error, seterror] = useState({
    status: false,
    msg: "error de credenciales",
  });
  const [login, setlogin] = useState(false);

  const [token, settoken] = useState("");

  const handleBtnProbar = () => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      withCredentials: true,
      url: "http://localhost:8080/products",
    }).then((data) => {
      let keys = Object.keys(data.data);
      if (keys.includes("error")) {
        seterror({ status: true, msg: data.data.error });
        setlogin(false);
      } else {
        console.log(data.data);
      }
    });
  };
  return (
    <div className="App">
      {error.status ? (
        <Error seters={{ error: seterror }} msg={error.msg}></Error>
      ) : login ? (
        <LogSuccess
          geters={{ usuario: usuario }}
          seters={{ login: setlogin }}
        ></LogSuccess>
      ) : (
        <Login
          geters={{ usuario }}
          seters={{
            usuario: setusuario,
            error: seterror,
            token: settoken,
            login: setlogin,
          }}
        ></Login>
      )}

      <p> Boton para probar el token del usuario cuando inicia session</p>
      <p> Hace un console.log con los productos si se inicio correctamente </p>
      <Button
        variant="secondary"
        onClick={() => {
          handleBtnProbar();
        }}
      >
        Usuario
      </Button>
    </div>
  );
}

export default App;
