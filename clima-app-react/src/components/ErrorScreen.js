import React from 'react';
import PropTypes from 'prop-types';


export const ErrorScreen = ({ mensaje }) => {
    return (
        
            <p className="red darken-4 error">{ mensaje }</p>
        
    )
}

ErrorScreen.propTypes = {
    mensaje: PropTypes.string.isRequired
}
