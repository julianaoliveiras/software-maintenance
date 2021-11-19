import React from 'react';
import './bolinhas.css';
import { Link } from 'react-router-dom';

import {useDispatch, useSelector} from 'react-redux';
import NewReceitas from '../../view/newReceitas';
import Identificador from '../../view/identificador';

function Bolinhas({active, onClick}){
    return(
        <div onClick={onClick}>  
            <Link to="#" className={active ? "bolinha ativo" : "bolinha"}></Link>
            <div className="limpar"></div>
        </div>
        
    )
}
export default Bolinhas;
   