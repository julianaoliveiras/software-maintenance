import React, {useState} from 'react';
import './alterarSenha.css'
import { Link, Redirect } from 'react-router-dom';

import firebase from '../../config/firebase';
import 'firebase/auth'
import { useSelector, useDispatch } from 'react-redux';
import Identificador from '../identificador';
import Menu from '../../componets/menu';
import Rodape from '../../componets/rodape';
import Swal from 'sweetalert2'





function AlterarSenha(){
  const [email, setEmail]= useState();
  const [senha, setSenha]= useState();

  const dispatch = useDispatch();

  function recSenha(){
    firebase.auth().sendPasswordResetEmail(email)
    .then(resultado => {
        Swal.fire({icon: 'success', title: 'Email de recuperação de senha enviado', timer: 1500});
    }).catch(error => {
        Swal.fire({icon: 'error', title: 'Porfavor insira um email válido', timer: 1500});
    })
  }


    return(
        <div class="fundo8">
        <div class="centro">
            <Menu></Menu>
        <div className="login">
            
            <div className="centro-login">
                <div className="espaco-login">
                    <div className="login-titulo">
                         <span className="login-titulo-1">Alterar Senha</span>
                    </div>
                    <div className="form-group form-group-lg">
                        <form className="login-form">
                                <div class="input">  
                                    <label for="inputdefault"><span class="label-input">E-mail:</span></label>
                                    <input onChange={(e) => setEmail(e.target.value)} class="form-input " type="text" name="username" placeholder="Entrar com o e-mail"/>       
                                </div>
                            
                                <div class="btn-logar-box">
                                    <button onClick={recSenha} class="btn btn-default btn-lg btn-logar" type= "button">Enviar link para recuperar a senha</button>
                                </div> 
                        </form>
                    </div> 
                </div>
            </div>
        </div>  
        </div>
        <Rodape></Rodape>
        </div>
    );
}
export default AlterarSenha;