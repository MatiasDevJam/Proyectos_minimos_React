import React, { useState } from 'react'
import { ErrorScreen } from './ErrorScreen';

export const FormScreen = ({ setBusqueda }) => {

    const [termino, setTermino] = useState('');
    const [error, setError] = useState( false )

    const handleSubmit = (e) => {
        e.preventDefault();

        if( termino.trim() === '' ){
            setError( true )
            return;
        }
        setError( false )

        setBusqueda( termino )
        
    }

    return (
        <form
            onSubmit={ handleSubmit }
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text" 
                        className="form-control form-control-lg"
                        placeholder="Buscá una imagen, ejemplo: futbol o café"
                        onChange={ e  => setTermino( e.target.value )}
                    />
                </div>

                <div className="form-group col-md-4">
                    <input 
                        type="submit" 
                        className="btn btn-lg btn-primary btn-block"
                        placeholder="Buscá una imagen, ejemplo: futbol o café"
                        value="Buscar"
                    />
                </div>
            </div>

            { error ? <ErrorScreen mensaje="Agregá una búsqueda" /> : null }
        </form>
    )
}
