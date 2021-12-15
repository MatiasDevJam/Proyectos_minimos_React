import React, { useEffect, useState } from 'react'
import { FormScreen } from './components/FormScreen';
import { ListadoImagenesScreen } from './components/ListadoImagenesScreen';

function App() {

  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [paginaactual, setPaginaactual] = useState(1);
  const [totalpaginas, setTotalpaginas] = useState(1);

  useEffect(() => {
    
    const consultaApi = async() => {
    
      if( busqueda === '' ) return;

    const imagenesPorPagina = 10;
    const key = '24670810-de900e4134f21ddf7ef163f98';
    const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

    const respuesta = await fetch(url);
    const resultado = await respuesta.json();

    setImagenes(resultado.hits)

    // calcular total de páginas
    const calcularTotalPaginas = Math.ceil( resultado.totalHits / imagenesPorPagina );
    setTotalpaginas(calcularTotalPaginas)

    //mover la pantala hacia arriba
    const jumbotron = document.querySelector('.jumbotron');
    jumbotron.scrollIntoView({ behavior: 'smooth' })

    }
    consultaApi();

  }, [ busqueda, paginaactual ])

  const handleClickAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;

    if(nuevaPaginaActual === 0 ) return;

    setPaginaactual(nuevaPaginaActual)
  }

  const handleClickSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;

    if( nuevaPaginaActual > totalpaginas ) return;

    setPaginaactual(nuevaPaginaActual)
  }

  return (
    <div className="container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imágenes</p>

          <FormScreen 
            setBusqueda={ setBusqueda }
          />
        </div>

        <div className="row justify-content-center">
          <ListadoImagenesScreen 
            imagenes={ imagenes }
          />
        </div>

        { (paginaactual === 1 ) ?
            null
          :
            ( 
              <button
                type="button"
                className="btn btn-info mr-1"
                onClick={ handleClickAnterior }
              >
                &laquo; Anterior 
              </button> 
            ) 
        }

        { (paginaactual === totalpaginas ) ?
            null
          :
            ( 
              <button
                type="button"
                className="btn btn-info"
                onClick={ handleClickSiguiente }
              >
                Siguiente &raquo;
              </button>
            ) 
        }

        

    </div>
  );
}

export default App;
