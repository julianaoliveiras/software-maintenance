import React, {useState} from 'react';
import './login.css'
import { Link, Redirect } from 'react-router-dom';

import firebase from '../../config/firebase';
import 'firebase/auth'
import { useSelector, useDispatch } from 'react-redux';
import Identificador from '../identificador';
import Menu from '../../componets/menu';
import Rodape from '../../componets/rodape';
import Swal from 'sweetalert2'

function Login(){
  const [email, setEmail]= useState();
  const [senha, setSenha]= useState();

  const dispatch = useDispatch();

    function autenticar(){
        if(!email || !senha ){
            Swal.fire({icon: 'error', title: 'Você precisa preencher todos os campos! 😒', timer: 1500});
        }
       firebase.auth().signInWithEmailAndPassword(email, senha).then(resultado=>{
           Swal.fire({icon: 'success', title: 'Login efetuado com sucesso!', timer: 1000});
           dispatch({type: 'LOGIN', usuarioEmail: email})
       })
       .catch(erro=>{
           switch(erro.message){
            case 'The password is invalid or the user does not have a password.':
                Swal.fire({icon: 'error', title: 'A senha é inválida', timer: 1500});
                break;
            case 'There is no user record corresponding to this identifier. The user may have been deleted.':
                Swal.fire({icon: 'error', title: 'Email inválido!', timer: 1500});
                break;
            case 'The email address is badly formatted.':
                Swal.fire({icon: 'error', title: 'O formato do email é inválido!', timer: 1500});
                break;
            default:
                Swal.fire({icon: 'error', title: 'Não foi possível cadastrar. Por favor tente mais tarde!', timer: 1500});
                break;
        }
           
       })
    }
    return(
        <div class="fundo8">
        <div class="centro">
            <Menu></Menu>
        <div className="login">
            {
                useSelector(state => state.usuarioLogado) > 0 ? <Redirect to='/identificador' /> : null
            }
            <div className="centro-login">
                <div className="espaco-login">
                    <div className="login-titulo">
                         <span className="login-titulo-1">Login de Usuário</span>
                    </div>
                    <div className="form-group form-group-lg">
                        <form className="login-form">
                        <div class="input">  
                                <label for="inputdefault"><span class="label-input">E-mail</span></label>
                                <input onChange={(e) => setEmail(e.target.value)} class="form-input " type="text" name="username" placeholder="Entrar com o e-mail">
                                </input>       
                            </div>
                            <div class="input" >
                                <label for="inputdefault"><span class="label-input">Senha</span></label>
                                <input onChange={(e) => setSenha(e.target.value)} class="form-input" type="password" name="pass" placeholder="Entrar com a senha">
                                </input>   
                                <span class="focus"></span>
                            </div>
                            <div class="btn-logar-box">
                                <button class="btn btn-default btn-lg btn-logar" onClick={autenticar} type= "button">Login</button>
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
export default Login;