import React, { useState, useEffect } from 'react';
import { FormScreen } from './components/FormScreen';

import axios from 'axios';
import { LetraScreen } from './components/LetraScreen';
import { InfoScreen } from './components/InfoScreen';

function App() {

  const [busquedaletra, setBusquedaletra] = useState({});
  const [letra, setLetra] = useState('');
  const [info, setInfo] = useState({})

  useEffect(() => {
    
    if(Object.keys(busquedaletra).length === 0 ) return

    const consultarApiLetra = async() => {

      const { artista, cancion } = busquedaletra

      // API lyrics.ovh
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;

      // API theaudioDB
      const url2 = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artista}`

      const [ letra, informacion ] = await Promise.all([
        axios(url),
        axios(url2)
      ])

      setLetra(letra.data.lyrics)
      setInfo(informacion.data.artists[0])

      // setLetra(resultado.data.lyrics)

      
    }
    consultarApiLetra();

  }, [busquedaletra, info])

  return (
      <>
      <FormScreen 
        setBusquedaletra={ setBusquedaletra }
      />

      <div className="container mt-5">
        <div className="row">
            <div className="col-md-6">
              <InfoScreen 
                info={ info }
              />
            </div>
            <div className="col-md-6">
              <LetraScreen 
                letra={ letra }
              />
            </div>
        </div>
      </div>
      </>
  );
}

export default App;
