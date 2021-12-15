import React from 'react'
import { NoticiasScreen } from './NoticiasScreen';
import PropTypes from 'prop-types';


export const ListadoNoticias = ({ noticias }) => {
    return (
        <div className="row">
            { noticias.map(noticia =>(
                <NoticiasScreen 
                    key={noticia.url }
                    noticia={ noticia }
                />
            )) }
        </div>
    )
}

ListadoNoticias.propTypes = {
    noticias: PropTypes.array.isRequired
}
