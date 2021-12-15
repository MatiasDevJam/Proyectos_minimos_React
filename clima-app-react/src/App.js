import { useEffect } from 'react';
import { useState } from 'react';
import { ClimaScreen } from './components/ClimaScreen';
import { ErrorScreen } from './components/ErrorScreen';
import { FormScreen } from './components/FormScreen';
import { HeaderScreen } from './components/HeaderScreen';

function App() {

  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: ''
})

const { ciudad, pais } = busqueda;

const [consultar, setConsultar] = useState( false )

const [resultado, setResultado] = useState({});

const [error, setError] = useState( false )

useEffect(() => {

  const consultarApi = async() =>{

    if( consultar ){

    const appId = '87aefce042cbae57eb7c099235b7aba8';

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ ciudad },${ pais }&appid=${ appId }`

    const respuesta = await fetch(url);
    const resultado = await respuesta.json();

    // guardamos los valores de la respuesta de la API
    setResultado(resultado);
    setConsultar( false );

    // detecta errores en la búsqueda 
    if( resultado.cod === "400"){
      setError( true );
    } else {
      setError( false );
    }

    }

  }
  consultarApi();
}, [ consultar, ciudad, pais ])

  let componente;
  if( error ){
    componente = <ErrorScreen mensaje="No hay resultados" />
  } else {
    componente = <ClimaScreen 
                    resultado={ resultado }
                 />
  }



  return (
    <>
      <HeaderScreen 
        titulo='Clima React App'
      />
      

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <FormScreen 
                busqueda={ busqueda }
                setBusqueda={ setBusqueda }
                setConsultar={ setConsultar }
              />
            </div>
            <div className="col m6 s12">
              { componente }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
