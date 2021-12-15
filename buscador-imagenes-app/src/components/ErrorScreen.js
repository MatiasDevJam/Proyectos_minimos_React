import React from 'react'

export const ErrorScreen = ({ mensaje }) => {
    return (
        <p className="my-3 text-center text-white alert alert-danger">{ mensaje }</p>
    )
}
