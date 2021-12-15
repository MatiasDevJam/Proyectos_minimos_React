import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

// crear el context
export const RecetasContext = createContext();

const RecetasProvider = ( props ) => {

    const [recetas, setRecetas] = useState([])
    const [buscar, setBuscar] = useState({
        nombre: '',
        categoria: ''
    })

    const [consultar, setConsultar] = useState( false );

    const { nombre, categoria } = buscar;

    useEffect(() => {
        if( consultar ){
            
            const obtenerRecetas = async() => {
        
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;

                const resultado = await axios.get(url);

                setRecetas( resultado.data.drinks )
            }

            obtenerRecetas();
        }
    }, [ buscar ])

    return (
        <RecetasContext.Provider
            value={{ 
                    recetas,
                    setBuscar,
                    setConsultar
                }}
        >
            { props.children }
        </RecetasContext.Provider>
    )
}

export default RecetasProvider;