import React, { useContext, useState } from 'react'
import { CategoriasContext } from './context/CategoriasContext';
import { RecetasContext } from './context/RecetasContext';

export const FormScreen = () => {

    const [busqueda, setBusqueda] = useState({
        nombre: '',
        categoria: ''
    })

    const { categorias } = useContext(CategoriasContext);
    const { setBuscar, setConsultar } = useContext(RecetasContext);

    const handleChange = (e) => {
        setBusqueda({
            ...busqueda,
            [e.target.value] : e.target.value
        })
    }

    return (
        <form
            className="col-md-12"
            onSubmit={ e => {
                e.preventDefault();
                setBuscar(busqueda);
                setConsultar( true )
            }}
        >
            <fieldset className="text-center">
                <legend>Buscá Bebidas por Categoría o Ingrediente</legend>
            </fieldset>

            
            <div className="row mt-4">
                <div className="col-md-4">
                    <input 
                        type="text" 
                        name="nombre"
                        className="form-control"
                        placeholder="Buscá por Ingrediente"
                        onChange={ handleChange }
                    />
                </div>

                <div className="col-md-4">
                    <select 
                        name="categoria" 
                        className="form-control"
                        onChange={ handleChange }
                    >
                        <option disabled>--Seleccioná Categoría--</option>
                        { Object.keys(categorias).map( categoria => (
                            <option
                                key={ categoria.strCategory }
                                value={ categoria.strCategory }
                            >
                                { categoria.strCategory }
                            </option>
                        )) }
                    </select>
                </div>

                <div className="col-md-4">
                    <input 
                        type="suubmit" 
                        className="btn btn-block btn-primary"
                        value="Buscar Bebidas"
                    />
                </div>
            </div>
            
        </form>
    )
}
