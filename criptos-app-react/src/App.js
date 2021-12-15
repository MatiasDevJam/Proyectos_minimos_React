import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled';
import imagen from './criptos.png'
import { FormScreen } from './components/FormScreen';
import axios from 'axios';
import { CotizacionScreen } from './components/CotizacionScreen';
import { Spinner } from './components/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {

  const [moneda, setMoneda] = useState('');
  const [cripto, setCripto] = useState('');
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState({});

  useEffect(() => {
    
    const cotizarCripto = async () => {
        // evitamos la ejecución la primera vez
      if( moneda === '' ) return;

      //consultar la api para obtener la cotización
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ cripto }&tsyms=${ moneda }`

      const resultado = await axios.get(url);

      // mostrar el spinner
      setCargando( true )

      // ocultamos el spinner y mostramos el resultado
      setTimeout(() => {
        
        // cambiamos el estado de cargando
        setCargando(false)

        // continuamos cargando la cotización
        setResultado( resultado.data.DISPLAY[cripto][moneda] )
      }, 3000);
      
    }

    cotizarCripto();

  }, [ moneda, cripto ])

  const componente = ( cargando ) ? <Spinner /> : <CotizacionScreen resultado={ resultado }/>

  return (
    <Contenedor>
      <div>
        <Imagen 
          src={ imagen } 
          alt="imagen cripto"
        />
      </div>

      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>
        <FormScreen 
          setMoneda={ setMoneda }
          setCripto={ setCripto }
        />

        { componente }

      </div>
    </Contenedor>
  );
}

export default App;
