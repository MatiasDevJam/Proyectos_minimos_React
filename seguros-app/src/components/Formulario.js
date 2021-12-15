import React from 'react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { obtenerDiferenciaYear, calcularMarca, obtenerPlan } from '../helpers/helper';
import PropTypes from 'prop-types';


const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;

const Label = styled.label`
    flex: 0 0 100px;
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    --webkit-appearance: none;
`;

const InputRadio = styled.input`
    margin: 0 1rem;
`;

const Boton = styled.button`
    background-color: #00838F;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    margin-top: 2rem;
    transition: background-color .3s ease;

    &:hover {
        background-color: #26C6DA;
        cursor: pointer;
    }
`;

const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
`

export const Formulario = ({ setResumen, setCargando }) => {

    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })

    const [error, setError] = useState( false )

    const { marca, year, plan } = datos;

    // leemos los datos del formulario y lo agregamos al setDatos
    const handleChange = (e) => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
            
        })
    };

    const handleSubmit = (e) =>{
        e.preventDefault();

        if( marca.trim() === '' || year.trim() === '' || plan.trim() === '' ){
            setError( true );
            return;
            
        }

        setError( false )

        let resultado = 2000;

        // obtener la diferencia en años
        const diferenciaYear = obtenerDiferenciaYear( year );

        // por cada año tenemos que restar el %3
        resultado -= (( diferenciaYear * 3 ) * resultado ) / 100;

        // calculamos por marca
        resultado = calcularMarca( marca ) * resultado;

        // aumento según plan
        const incrementoPlan = obtenerPlan( plan );
        resultado = parseFloat( incrementoPlan * resultado ).toFixed(2);
        
        setCargando( true );

        setTimeout(() => {

            // elimina el spinner
            setCargando( false )

            // pasa la información al componente principal
            setResumen({
                cotizacion: +resultado,
                datos
            })
        }, 3000);
        
    }

    return (
        <form 
            onSubmit={ handleSubmit }
        >

            { error ? <Error>Todos los campos son obligatorios</Error> : null}

            <Campo>
                <Label>Marca</Label>
                <Select
                    name="marca"
                    value={ marca }
                    onChange={ handleChange }
                >
                    
                    <option value="" disabled>-- Seleccione --</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiatico</option>

                </Select>
            </Campo>

            <Campo>
                <Label>Año</Label>
                <Select
                    name="year"
                    value={ year }
                    onChange={ handleChange }
                > 
                                        
                    <option value="" disabled>-- Seleccione --</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>

                </Select>
            </Campo>

            <Campo>

                {/* para la manejar los valores de los input radio
                usamos el checked */}

                <Label>Plan</Label>

                <label><InputRadio 
                    type="radio" 
                    name="plan"
                    value="basico"   
                    checked={ plan === "basico" } 
                    onChange={ handleChange }
                />Básico</label>

                <label><InputRadio 
                    type="radio" 
                    name="plan"
                    value="completo"    
                    checked={ plan === "completo" } 
                    onChange={ handleChange }
                />Completo</label>

            </Campo>

            <Boton type="submit">Cotizar</Boton>
            
            
        </form>
    )
}

Formulario.propTypes = {
    setResumen: PropTypes.func.isRequired,
    setCargando: PropTypes.func.isRequired
}