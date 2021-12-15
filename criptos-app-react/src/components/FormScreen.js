import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useMoneda } from '../hooks/useMoneda';
import { useCriptomoneda } from '../hooks/useCriptomoneda';
import axios from 'axios';
import { ErrorScreen } from './ErrorScreen';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor: pointer;
    }
`;

export const FormScreen = ({ setMoneda, setCripto }) => {

    // state del listado de criptomonedas
    const [listacripto, setListacripto] = useState([]);

    const [error, setError] = useState( false )

    const MONEDAS = [
        { codigo: 'USD', nombre:'Dolar' },
        { codigo: 'MXN', nombre:'Peso Mexicano' },
        { codigo: 'EUR', nombre:'Euro' },
        { codigo: 'GBP', nombre:'Libra Esterlina' },
    ]

    const [ moneda, SelectMoneda] = useMoneda('Elige tu moneda', '', MONEDAS);

    const [ cripto, SelectCripto ] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto);

    // ejecutamos llamado a la API
    useEffect(() => {
        
        const consultarApi = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
    
            const resultado = await axios.get(url);
            console.log(resultado);

            setListacripto(resultado.data.Data)
        }
        consultarApi();

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        // validar
        if( moneda === '' || cripto === ''){
            setError( true );
            return;
        }

        setError( false )
        setMoneda(moneda)
        setCripto(cripto)
    }
    

    return (
        <form
            onSubmit={ handleSubmit }
        >
            { error ? <ErrorScreen mensaje='Todos los campos son obligatorios' /> : null }

            <SelectMoneda />

            <SelectCripto />
            
            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
    )
}
