import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Tab, Tabs, Alert, Container, Row } from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [lettesAndWords, setlettesAndWords] = useState({});
  const [textLetersAndWords, settextLetersAndWords] = useState( '' );
  const [reverse, setreverse] = useState({});
  const [textReverse, settextReverse] = useState( '' );
  const [number, setnumber] = useState(0);
  const [numberInWords, setnumberInWords] = useState( '' );
  const [errorMessage, seterrorMessage] = useState( '' ); 
  const counterService = "http://localhost:7020/counter";
  const revertService = "https://localhost:7011/reverttext";
  const numbertoletterService = "https://localhost:7001/numbertoletter";

  const callCounter = React.useCallback(() => {
    axios.post(counterService,{
        "text": textLetersAndWords })
    .then((response) => {
      seterrorMessage('')
      setlettesAndWords(response.data)
    })
    .catch((error) => {
      setlettesAndWords({})
      seterrorMessage('Este servicio no esta disponible')
      console.log(error)
    })
  })

  const callReverse = React.useCallback(() => {
    axios.post(revertService,{
        "text": reverse })
    .then((response) => {
      seterrorMessage('')
      settextReverse(response.data)
    })
    .catch((error) => {
      settextReverse('')
      seterrorMessage('Este servicio no esta disponible')
      console.log(error)
    })
  })

  const callNumberToWords = React.useCallback(() => {
    axios.get(numbertoletterService + `/${number}`)
    .then((response) => {
      seterrorMessage('')
      setnumberInWords(response.data)
    })
    .catch((error) => {
      setnumberInWords('')
      seterrorMessage('Este servicio no esta disponible')
      console.log(error)
    })
  })

  return (
    <div>
       <div>
        <h1> Bienvenido a la app para manejo de texto </h1>
       </div>
       { errorMessage ?
          <Alert variant="danger">
                  {errorMessage}
          </Alert>
          : <span> </span>
        }
       <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="counter" title="Contador de letras y palabras">    
          <Container>
          <Row>
            <label>Ingresa el texto para calcular numero de caracteres y palabras</label>
            </Row>            
            <Row>
              <textarea onChange={e => settextLetersAndWords(e.target.value)}></textarea>
            </Row> 
            <Row>
              { lettesAndWords.words &&  lettesAndWords.characters ?
                <Alert>
                  <label>Palabras: {lettesAndWords.words}</label>
                  <br />
                  <label>caracteres: {lettesAndWords.characters}</label>
                </Alert>
                : <span> </span>
              }
            </Row>  
            <Row>  
            <Button variant="primary" onClick={callCounter}>Calcular</Button>
            </Row>  
          </Container>   
         
        </Tab>
        <Tab eventKey="revert" title="Revetir texto">
        <Container>
          <Row>
            <label>Ingresa el texto para a revertir</label>
            </Row>            
            <Row>
              <textarea onChange={e => setreverse(e.target.value)}></textarea>
            </Row> 
            <Row>
              { textReverse ?
                <Alert>
                  {textReverse}
                </Alert>
                : <span> </span>
              }
            </Row>  
            <Row>  
            <Button variant="primary" onClick={callReverse}>Reversar Texto</Button>
            </Row>  
          </Container>  
        </Tab>
        <Tab eventKey="numberconverter" title="Convertir numero a texto">
        <Container>
          <Row>
            <label>Ingresa el numero a convetir en texto</label>
            </Row>            
            <Row>
              <input type="number" onChange={e => setnumber(e.target.value)} />
            </Row> 
            <Row>
              { numberInWords ?
                <Alert>
                  {numberInWords}
                </Alert>
                : <span> </span>
              }
            </Row>  
            <Row>  
            <Button variant="primary" onClick={callNumberToWords}>Convertir a texto</Button>
            </Row>  
          </Container> 
        </Tab>
      </Tabs>
      
    </div>
  );
}

export default App;
