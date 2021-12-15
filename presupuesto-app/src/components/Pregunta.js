import React from 'react'
import PropTypes from 'prop-types';
import { useState } from 'react'
import { Error } from './Error';

export const Pregunta = ({ setPresupuesto, setRestante, cambiarInicio }) => {

    // creamos el state para el presupuesto
    const [cantidad, setCantidad] = useState( 0 );
    const [error, setError] = useState( false )

    // función que maneja los valores del setState
    const handleChange = (e) => {
        setCantidad( +e.target.value, 10 )
    }

    // función para manejar el submit del presupuesto
    // también podemos manejar una validación
    const handleSubmit = (e) => {
        e.preventDefault();

        // validamos que ingresen datos correctos
        if( cantidad < 1 || isNaN( cantidad ) ){
            setError( true );
            return;
        }

        // si pasa la validación el error quedará en false
        // y guardamos los valores que viene como props que se pasan
        // al componente App
        setError( false );
        setPresupuesto( cantidad );
        setRestante( cantidad );
        cambiarInicio( false )
    }

    return (
        <>
          <h2>Coloca tu presupuesto</h2>  

          { error ? 
                <Error mensaje="El Presupuesto es incorrecto" />
            : 
                null }

          <form
            onSubmit={ handleSubmit }
          >
              <input 
                type="number"
                className="u-full-width"
                placeholder="Coloca tu presupuesto"
                onChange={ handleChange }
              />

              <input 
                type="submit"
                className="button-primary u-full-width"
                value="Definir Presupuesto"
              />
          </form>
        </>
    )
}

Pregunta.propTypes = {
  setPresupuesto: PropTypes.func.isRequired,
  setRestante: PropTypes.func.isRequired,
  cambiarInicio: PropTypes.func.isRequired,
}
