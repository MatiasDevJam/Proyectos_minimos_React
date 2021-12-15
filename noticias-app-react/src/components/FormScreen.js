import React from 'react';
import styles from './FormScreen.module.css';
import {useSelect} from '../hooks/useSelect';
import PropTypes from 'prop-types';


export const FormScreen = ({ setCategoria }) => {

    const OPCIONES = [
        { value: 'general', label: 'General' },
        { value: 'negocios', label: 'Negocios' },
        { value: 'entertaiment', label: 'Entretenimiento' },
        { value: 'salud', label: 'Salud' },
        { value: 'science', label: 'Ciencia' },
        { value: 'sports', label: 'Deportes' },
        { value: 'technology', label: 'Tecnología' },
    ]

    // utilizamos el custom hook
    const [ state, SelectNoticias ] = useSelect('general', OPCIONES);

    // submit al form y pasamos la categoria al componente App
    const handleSubmit = (e) => {
        e.preventDefault();

        setCategoria( state )
    }

    return (
        <div className={`${ styles.buscador } row`}>
            <div className="col s12 m8 offset-m2">
                <form
                    onSubmit={ handleSubmit }
                >
                    <h2 className={styles.heading}>Encuentra Noticias por Categoría</h2>

                    <SelectNoticias />

                    <div className="input-field col s12">
                        <input 
                            type="submit" 
                            className={`${ styles['btn-block'] } btn-large amber darken-2`}
                            value="Buscar"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

FormScreen.propTypes = {
    setCategoria: PropTypes.func.isRequired
}