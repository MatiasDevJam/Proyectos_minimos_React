import React from 'react'

export const LetraScreen = ({ letra }) => {

    if( letra.length === 0 ) return null;

    return (
        <>
            <h2>Letra Canción</h2>
            <p className="letra"> { letra } </p>
        </>
    )
}
