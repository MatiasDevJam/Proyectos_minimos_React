import React from 'react';
import PropTypes from 'prop-types'


export const Gasto = ({ gasto }) => {
    return (
        <li className="gastos">
            <p>
                { gasto.nombre }

                <span className="gasto">$ { gasto.cantidad }</span>
            </p>
        </li>
    )
}

Gasto.propTypes = {
    gastos: PropTypes.object.isRequired
}

