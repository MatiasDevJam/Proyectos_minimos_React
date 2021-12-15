import React, { useContext, useState } from 'react';
import { ModalContext } from './context/ModalContext';
import Modal from '@mui/material/Modal';
import { makeStyles } from '@mui/material/styles';


function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 450,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

export const RecetaScreen = ({ receta }) => {

    const [ modalStyle ] = useState(getModalStyle);
    const [open, setOpen] = useState( false )

    const classes = useStyles();

    const handleOpen = () => {
        setOpen( true )
    }

    const handleClose = () => {
        setOpen( false )
    }

    const { info, setIdreceta, setReceta } = useContext(ModalContext);

    const mostrarIngredientes = ( informacion ) => {
        let ingredientes = []
        for( let i = 1; i < 16; i++ ){
            if( informacion[`strIngredient${i}`] ){
                ingredientes.push(
                    <li>{ informacion[`strIngredient${i}`] } { informacion[`strMeasure${i}`] }</li>
                )
            }
        }
        return ingredientes;
    }

    return (
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{receta.strDrink}</h2>

                <img 
                    className="card-img-top" 
                    src={receta.strDrinkThumb} 
                    alt={`Imagen de ${receta.strDrink}`} 
                />

                <div className="card-body">
                    <button
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={() => {
                            setIdreceta(receta.idDrink);
                            handleOpen();
                        }}
                    >
                        Ver Receta
                    </button>

                    <Modal
                        open={ open }
                        onClose={() => {
                            setIdreceta( null )
                            setReceta({});
                            handleClose();
                        }}
                    >
                        <div
                            style={ modalStyle }
                            className={ classes.paper }
                        >
                                <h2>{info.strDrink}</h2>
                                <h3 className="mt-4">Instrucciones</h3>
                                <p>
                                    { info.strInstructions }
                                </p>

                                <img 
                                    src={ info.strDrinkThumb } 
                                    className="img-fluid my-4"
                                    alt="Imagen"
                                />

                                <h3>Ingredientes y cantidades</h3>
                                <ul>
                                    { mostrarIngredientes(info) }
                                </ul>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    )
}
