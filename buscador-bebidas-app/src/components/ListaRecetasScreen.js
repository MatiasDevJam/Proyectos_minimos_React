import React, { useContext } from 'react'
import { RecetasContext } from './context/RecetasContext'
import { RecetaScreen } from './RecetaScreen';

export const ListaRecetasScreen = () => {

    const { recetas } = useContext( RecetasContext );

    return (
        <div className="row mt-5">
            { recetas.map(receta =>{
                <RecetaScreen 
                    key={ receta.idDrink }
                    receta={ receta }
                />
            }) }
        </div>
    )
}
