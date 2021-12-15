import React from 'react'
import { useState } from 'react';
import PropTypes from 'prop-types'
import { Error } from './Error';
import { shortid } from 'shortid'

export const Formulario = ({ setGasto, setCreargasto }) => {

    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState( 0 )
    const [error, setError] = useState( false )

    const handleSubmit = (e) => {
        e.preventDefault();

        //validamos
        if( cantidad < 1 || isNaN( cantidad ) || nombre.trim() === '' ){
            setError( true );
            return;
        }
        setError( false );

        // construimos el gasto
        const gasto = {
            nombre, 
            cantidad,
            id: shortid.generate()
        }

        //pasamos el gasto al componente App
        setGasto( gasto )
        setCreargasto( true )

        // reseteamos el form
        setNombre('');
        setCantidad( 0 );
    }

    return (
        <form
            onSubmit={ handleSubmit }
        >
            <h2>Agregá tus gastos</h2>

            { error ?
                <Error mensaje="Ambos campos son obligatorios" />
            :
                null
            }

            <div className="campo">
                <label>Nombre Gasto</label>
                <input 
                    type="text" 
                    className="u-full-width"
                    placeholder="Ej. Transporte"
                    value={ nombre }
                    onChange={ e => setNombre( e.target.value )}
                />
            </div>

            <div className="campo">
                <label>Cantidad Gasto</label>
                <input 
                    type="number" 
                    className="u-full-width"
                    placeholder="Ej. 300"
                    value={ cantidad }
                    onChange={ e => setCantidad( e.target.value )}
                />
            </div>

            <input 
                type="submit" 
                className="button-primary u-full-width"
                value="Agregar Gasto"
            />
        </form>
    )
}

Formulario.propTypes = {
    setGasto: PropTypes.func.isRequired,
    setCreargasto: PropTypes.func.isRequired
  }
  
