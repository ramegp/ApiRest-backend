import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import EnviarMsj from './components/EnviarMsj/EnviarMsj';
import FormInicio from './components/FormInicio/FormInicio';
import MensajesUsuarios from './components/MensajesUsuarios/MensajesUsuarios';

import io from 'socket.io-client'
import Conectados from './components/Conectados/Conectados';


import { normalize, schema, denormalize } from 'normalizr'


const socket = io('http://localhost:8080');

function App() {
  const [name, setname] = useState(null)
  const [logeado, setlogeado] = useState(false)

  const [mensajes, setmensajes] = useState(null)

  const [user , setuser ] = useState(null)


  socket.on('msj-server',(data)=>{console.log(data);})
  useEffect(() => {
    socket.on('mensajes',(data)=>{
    
      //console.log(JSON.stringify(data).length);

      const autor = new schema.Entity('author',{idAttribute:'id'})

      const msj = new schema.Entity('mensaje', {
        author: autor
      })

      const msjs = new schema.Entity('mensajes', {
        mensajes: [msj]
      })
      const desnormalizado = denormalize(data.result,msjs,data.entities);
      //console.log(JSON.stringify(desnormalizado).length);
      let porcentaje = (100*JSON.stringify(data).length)/JSON.stringify(desnormalizado).length
      //console.log(porcentaje);

      console.log(`El porcentaje de compresion es de .... %${100-porcentaje}`);

      setmensajes(desnormalizado.mensajes)
    })
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
          {mensajes?.map((m,i)=>{return(
            <MensajesUsuarios name={m.author.id} msg={m.text} date={m.author.alias} socket={socket}/>
            
            )})}
          </div>
          <EnviarMsj user={user} socket={socket}></EnviarMsj>
        </Col>
      </Row>
    </Container>):(<FormInicio seters={{name:setname,log:setlogeado,user:setuser}} socket={socket}/>))}
    
    
  </>
  );
}

export default App;
