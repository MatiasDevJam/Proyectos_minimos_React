import React, { useEffect, useState } from 'react';
import { HeaderScreen } from './components/HeaderScreen';
import { FormScreen } from './components/FormScreen';
import { ListadoNoticias } from './components/ListadoNoticias';

function App() {

  // definir categoria y noticias
  const [categoria, setCategoria] = useState('');
  const [noticias, setNoticias] = useState([])

  useEffect(() =>{
    
    const consultarApi = async () =>{
      const url = `https://newsapi.org/v2/top-headlines?country=ar&category=${ categoria }&apiKey=90aca9440cf744488e5204157a34bf4d`;

      const respuesta = await fetch(url);
      const noticias = await respuesta.json();

      setNoticias(noticias.article)
    }
    consultarApi();

  }, [ categoria ])

  return (
    <>
      <HeaderScreen 
        titulo='Buscador de Noticias'
      />

      <div className="container white">
        <FormScreen 
          setCategoria={ setCategoria }
        />

        <ListadoNoticias 
          noticias={ noticias }
        />
      </div>
    </>
  );
}

export default App;
