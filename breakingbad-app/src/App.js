import React from 'react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { Frase } from './components/Frase';
import { useEffect } from 'react';

const Contenedor = styled.div`
  display: flex;
  align-items: center;
  padding-top: 5rem;
  flex-direction: column;
`;

const Boton = styled.button`
  background: -webkit-linear-gradient(top left, #007d35 0%, #007d35 40%, #0f574e 100%);
  background-size: 300px;
  font-family: Arial, Helvetica, sans-serif;
  color: #fff;
  margin-top: 3rem;
  padding: 1rem 3rem;
  font-size: 2rem;
  border: 2px solid black;
  transition: background-size .3s ease;

  :hover {
    cursor: pointer;
    background-size: 400;
  }
`;

function App() {

  const [frase, setFrase] = useState({});

  const handleClick = async() => {
    const api = await fetch('https://breaking-bad-quotes.herokuapp.com/v1/quotes');
    const frase = await api.json();
    setFrase(frase[0]);
  }

  useEffect(() => {
    handleClick()
  }, [])

  return (
    <Contenedor>
      <Frase 
        frase={ frase }
      />

      <Boton
        onClick={ handleClick }
      >
        Obtener Frase
      </Boton>
    </Contenedor>
   
  );
}

export default App;
