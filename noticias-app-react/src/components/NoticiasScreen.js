import React from 'react';
import PropTypes from 'prop-types';

export const NoticiasScreen = ({ noticia }) => {

    // extraemos los datos de la API
    const { ulrToImage, url, title, description, source } = noticia;

    const imagen = (ulrToImage) ?
        <div className="card-image">
            <img scr={ ulrToImage } alt={ title } />
            <span className="card-title">{ source.name }</span>
        </div>
        : null;

    return (
        <div className="col s12 m6 l4">
            <div className="card">
                { imagen }

                <div className="card-content">
                    <h3>{ title }</h3>
                    <p>{ description }</p>
                </div>

                <div className="card-action">
                    <a
                        href={ url }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="waves-effect waves-light btn"
                    >
                       Ver noticia completa 
                    </a>

                </div>
            </div>
        </div>
    )
}

NoticiasScreen.propTypes = {
    noticia: PropTypes.object.isRequired
}
