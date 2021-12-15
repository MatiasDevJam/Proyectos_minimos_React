import React from 'react'
import CategoriasProvider from './components/context/CategoriasContext';
import ModalProvider from './components/context/ModalContext';
import RecetasProvider from './components/context/RecetasContext';
import { FormScreen } from './components/FormScreen';
import { HeaderScreen } from './components/HeaderScreen';
import { ListaRecetasScreen } from './components/ListaRecetasScreen';

function App() {
  return (
    <CategoriasProvider>
      <RecetasProvider>
        <ModalProvider>
          <HeaderScreen />

          <div className="container mt-5">
            <div className="row">
              <FormScreen />
            </div>

            <ListaRecetasScreen />
          </div>
        </ModalProvider>
      </RecetasProvider>
    </CategoriasProvider>
  );
}

export default App;
