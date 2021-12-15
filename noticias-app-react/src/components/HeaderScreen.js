import React from 'react';
import PropTypes from 'prop-types';


export const HeaderScreen = ({ titulo }) => {
    return (
        <nav className="nav-wrapper light-blue darken-3">
            <a href="#!" className="brand-logo cernter">{ titulo }</a>
        </nav>
    )
}

HeaderScreen.propTypes = {
    titulo: PropTypes.string.isRequired
}
