import React, {useState} from 'react';
import './registrar.css'
import firebase from '../../config/firebase';
import 'firebase/auth'
import Rodape from '../../componets/rodape';
import Menu from '../../componets/menu';
import Swal from 'sweetalert2';

function Registrar(){
    const [email, setEmail]= useState();
    const [senha, setSenha]= useState();

  

    function validar(){
       
        if(!email || !senha ){
            Swal.fire({icon: 'error', title: 'Você precisa preencher todos os campos! 😒', timer: 1500});
        }
        firebase.auth().createUserWithEmailAndPassword(email, senha).then(resultado=>{
            Swal.fire({icon: 'success', title: 'Cadastrado com sucesso', timer: 1000});
        }).catch(erro=>{
            switch(erro.message){
                case 'Password should be at least 6 characters':
                    Swal.fire({icon: 'error', title: 'A senha deve ter pelo menos 6 caracteres', timer: 1500});
                    break;
                case 'The email address is already in use by another account.':
                    Swal.fire({icon: 'error', title: 'Este email já está sendo usado por outra conta.', timer: 1500});
                    break;
                case 'The email addres is badly formatted.':
                    Swal.fire({icon: 'error', title: 'O formato do email é inválido', timer: 1500});
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
                <div className="centro-login">
                    <div  className="espaco-login">
                        <div  className="login-titulo">
                            <span  className="login-titulo-1">Registro de Usuário</span>
                        </div>
                        <form  className="login-form" >
                            <div className="input" >
                                <span  className="label-input">E-mail</span>
                                <input  onChange={(e) => setEmail(e.target.value)}  className="form-input" type="text" name="username" placeholder="Entrar com o e-mail"></input>
                                <span  className="focus"></span>
                            </div>
                            <div  className="input" >
                                <span  className="label-input">Senha</span>
                                <input  onChange={(e) => setSenha(e.target.value)} className="form-input" type="password" name="pass" placeholder="Entrar com a senha"></input>
                                <span  className="focus"></span>
                            </div>
                            <div  className="btn-logar-box">
                                <button onClick={validar} className="btn btn-default btn-lg btn-logar" type="button"> Registrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
            <Rodape></Rodape>
            </div>
    )
}
export default Registrar;