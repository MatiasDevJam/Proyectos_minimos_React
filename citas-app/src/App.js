import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Cita } from './components/Cita';

import { Formulario } from './components/Formulario';


function App() {

  // agregamos las citas en el localStorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if( !citasIniciales ){
    citasIniciales = [];
  }

  // maneja las citas
  const [citas, setCitas] = useState( citasIniciales )

  useEffect(() => {
   
    if( citasIniciales ){
      localStorage.setItem('citas', JSON.stringify( citas ))
    } else {
      localStorage.setItem('citas', JSON.stringify([]))
    }
  
  }, [ citas, citasIniciales ]);

  // función que toma todas las citas actuales y agrega una nueva cita
  const crearCita = (cita) => {
    setCitas([
      ...citas,
      cita
    ])
  }

  // función para eliminar una cita
  const handleDelete = ( id ) => {
    const nuevasCitas = citas.filter( cita => cita.id !== id );
    setCitas(nuevasCitas);
  }

  // mensaje condicional de títlo
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas'

  return (
    <>
      <h1>Administrador de Pacientes</h1>

      <div className="container">
        <div className="row">

          <div className="one-half column">
            <Formulario crearCita={ crearCita } />
          </div>

          <div className="one-half column">
            <h2>{ titulo }</h2>
              {citas.map( cita => (
                <Cita 
                  key={ cita.id }
                  cita={ cita }
                  eliminarCita={ handleDelete }
                />
              ))}
          </div>

        </div>
      </div>
    </>
  )}

export default App;
