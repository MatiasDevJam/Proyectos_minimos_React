import React from 'react';
import './spinner.css';
import styled from '@emotion/styled';

const CajaSpinner = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;
`

export const Spinner = () => {
    return (
            <CajaSpinner>
                <div className="sk-chase">
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                </div>
            </CajaSpinner>
                
    )
}
