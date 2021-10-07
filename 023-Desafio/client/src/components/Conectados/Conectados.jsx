import React, { useEffect, useState } from "react";
import UsuariosConectados from "../UsuariosConectados/UsuariosConectados";

const userConect = [
  {
    user: "Juan Carlos",
  },
  {
    user: "Ramiro",
  },
];

function Conectados(props) {
  const [users, setusers] = useState(null);
  useEffect(() => {
    props.socket.on('usuarios-conectados',(data)=>{
      setusers(data)
    })
  }, [])
  return (
    <div>
      {users?.map((u, i) => {
        return <UsuariosConectados name={u.user.id} socket={props.socket} />;
      })}
    </div>
  );
}

export default Conectados;
