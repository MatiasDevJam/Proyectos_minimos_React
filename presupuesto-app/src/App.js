import React, { useEffect } from 'react'
import { useState } from 'react';
import { ControlPresupuesto } from './components/ControlPresupuesto';
import { Formulario } from './components/Formulario';
import { Listado } from './components/Listado';
import { Pregunta } from './components/Pregunta';

function App() {

  // definimos los states para manejar el presupuesto y el resto 
  // que pasaremos como props en el componente pregunta
  const [presupuesto, setPresupuesto] = useState( 0 );
  const [restante, setRestante] = useState( 0 );
  const [inicio, setInicio] = useState( true )
  const [gastos, setGastos] = useState([]);
  const [gasto, setGasto] = useState({})
  const [creargasto, setCreargasto] = useState( false )

  // 
  useEffect(() => {

    // agrega el nuevo presupuesto
    if(creargasto){
      setGastos([
        ...gastos,
        gasto
    ]);

    // resta del presupuesto actual
    const presupuestoRestante = restante - gasto.cantidad;
    setRestante( presupuestoRestante );

    // reseteamos a false
    setCreargasto( false );
  }
  }, [gasto, creargasto, gastos, restante])


  return (
    <div className="container">
      <header>

        <h1>Gasto Semanal</h1>

          <div className="contenido-principal contenido">
            { inicio ?
            (
              <Pregunta 
                setPresupuesto={ setPresupuesto }
                setRestante={ setRestante }
                cambiarInicio={ setInicio }
              />
            ) 
            
            : 

            (
              <div className="row">

                <div className="one-half column">
                  <Formulario 
                    setGasto={ setGasto }
                    setCreargasto= { setCreargasto }
                  />
                </div>
                <div className="one-half column">
                  <Listado 
                    gastos={ gastos }
                  />

                  <ControlPresupuesto 
                    presupuesto={ presupuesto }
                    restante={ restante }
                  />
                </div>

              </div>
            )
            
            }
            

            
          </div>

      </header>
    </div>
  );
}

export default App;
