import React from 'react'
import PropTypes from 'prop-types';

export const HeaderScreen = ({ titulo }) => {
    return (
        <nav>
            <div className="nav-wrapper light-blue darken-2">
                <a href="#!" className="brand-logo">{ titulo }</a>
            </div>
        </nav>
    )
}

HeaderScreen.propTypes = {
    titulo: PropTypes.string.isRequired
}
