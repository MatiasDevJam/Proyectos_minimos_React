import React from 'react'
import { ImagenScreen } from './ImagenScreen'

export const ListadoImagenesScreen = ({ imagenes }) => {
    return (
        <div className="col-12 p-5 row">
            { imagenes.map( imagen =>(
                <ImagenScreen 
                    key={ imagen.id }
                    imagen={ imagen }
                />
            ) ) }
        </div>
    )
}
