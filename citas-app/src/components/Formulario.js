import React from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types'

export const Formulario = ({ crearCita }) => {

    // Creamos el state que maneja el form de citas
    const [cita, setCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas:''
    });

    const [error, setError] = useState( false )

    // Función que se ejecuta cuando cambia el state de los inputs del form
    const handleChange = e => {
        setCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    // usamos destructuring en cita de nuestro state
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    // función que maneja el submit del formulario
    const handleSubmit = e => {
        e.preventDefault();
        
        // validamos que los campos no esten vacios

        if( mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            // le pasamos el setError en true para que falle la validación
            setError( true );
            return;
        }
        // dejamos el setError en false en caso de pase la validación sin errores, no mostrara mensaje de error.
            setError( false );

        // asginamos a un id a cada cita con la libreria UUID
        cita.id = uuidv4();

        // creamos la cita con la prop
        crearCita(cita)

        // limpiamos los campos del form
        setCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas:''
        })

    }

    return (
        <>
            <h2>Crear Cita</h2>

            {
                error
                    ? <p className="alerta-error">Todos los campos son obligatorios</p>
                    : null
            }

            <form 
                onSubmit={ handleSubmit }
            >
                <label>Nombre Mascota</label>
                <input 
                    type="text" 
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={ handleChange }
                    value={ mascota }
                />

                <label>Nombre Dueño</label>
                <input 
                    type="text" 
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño de la Mascota"
                    onChange={ handleChange }
                    value={ propietario }
                />

                <label>Fecha</label>
                <input 
                    type="date" 
                    name="fecha"
                    className="u-full-width"
                    onChange={ handleChange }
                    value={ fecha }
                />

                <label>Hora</label>
                <input 
                    type="time" 
                    name="hora"
                    className="u-full-width"
                    onChange={ handleChange }
                    value={ hora }
                />

                <label>Síntomas</label>
                <textarea 
                    className="u-full-width"
                    name="sintomas"
                    onChange={ handleChange }
                    value={ sintomas }
                >
                </textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >
                    Agregar Cita
                </button>
            </form>
        </>
    )
}

Formulario.propsTypes = {
    crearCita: PropTypes.func.isRequired
}
