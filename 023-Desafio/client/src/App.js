import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import EnviarMsj from './components/EnviarMsj/EnviarMsj';
import FormInicio from './components/FormInicio/FormInicio';
import MensajesUsuarios from './components/MensajesUsuarios/MensajesUsuarios';

import io from 'socket.io-client'
import Conectados from './components/Conectados/Conectados';
const Mensajes = [
  {
    user:"ramiro",
    msg:"Buenos dias asdasdasdadasdasasda das dasd asd adjkdhlaj hahfla",
    date: Date.now()
  },
  {
    user:"ramiro",
    msg:"Buenos dias asdasdasdadasdasjkdhlaj hahfla",
    date: Date.now()
  },
  {
    user:"ramiro",
    msg:"Buenos dias asdasdasasdadaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadadasdasjkdhlaj hahfla",
    date: Date.now()
  },
  {
    user:"ramiro",
    msg:"Buenos dias asdasdasasdadaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadadasdasjkdhlaj hahfla",
    date: Date.now()
  },{
    user:"ramiro",
    msg:"Buenos dias asdasdasasdadaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadadasdasjkdhlaj hahfla",
    date: Date.now()
  },
  {
    user:"ramiro",
    msg:"Buenos dias asdasdasasdadaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadadasdasjkdhlaj hahfla",
    date: Date.now()
  },
  {
    user:"ramiro",
    msg:"Buenos dias asdasdasasdadaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadadasdasjkdhlaj hahfla",
    date: Date.now()
  },
  {
    user:"ramiro",
    msg:"Buenos dias asdasdasasdadaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadadasdasjkdhlaj hahfla",
    date: Date.now()
  }
]


const socket = io('http://localhost:8080');

function App() {
  const [name, setname] = useState(null)
  const [logeado, setlogeado] = useState(false)

  const [mensajes, setmensajes] = useState(null)

  socket.on('msj-server',(data)=>{console.log(data);})
  useEffect(() => {
    socket.on('mensajes',(msj)=>{setmensajes(msj)})
  }, [])
  return (
    <>
    <div  className="titulo"><h3>Sala de Chat</h3></div>
    {(logeado?(<Container className='containerChat'>
      <Row className="containerRow">
        <Col xs className="Chat-usuarios">

            <Conectados socket={socket}/>
        </Col>
        <Col lg={9} className="Chat-mensajes">
          <div className="mensajes-all">
          {mensajes.map((m,i)=>{return(
            <MensajesUsuarios name={m.author.id} msg={m.text} date={m.author.alias} socket={socket}/>
            
            )})}
          </div>
          <EnviarMsj user={name} socket={socket}></EnviarMsj>
        </Col>
      </Row>
    </Container>):(<FormInicio seters={{name:setname,log:setlogeado}} socket={socket}/>))}
    
    
  </>
  );
}

export default App;
