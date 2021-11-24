/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/alt-text */
import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Menu from '../../componets/menu';
import Rodape from '../../componets/rodape';
import './receitas.css';
import firebase from '../../config/firebase';
import Fundo from '../../componets/fundo';
import icon from '../img/calendar.png';
import editar from '../img/editar-arquivo.png';
import titulo from '../img/titulo.png';
import lista from '../img/lista.png';
import livroReceitas from '../img/livro-de-receitas.png';
import lixo from '../img/lata-de-lixo.png';
import { useHistory  } from 'react-router-dom';
import Swal from 'sweetalert2'

function Receitas({match}){
    const [post, setPost] = useState({});
    const [urlImg, setUrlImg] = useState({});
    const usuarioLogado = useSelector(state => state.usuarioEmail);
    const [carregando, setCarregando] = useState(1);

    const history = useHistory();

    useEffect( () => {
        firebase.firestore().collection('receitas').doc(match.params.idPost).get().then( resultado => {
            setPost(resultado.data());
            console.log('resultado.data',resultado.data())
            firebase.storage().ref(`Imagens/${resultado.data().imagens}`).getDownloadURL().then( url => {
                setUrlImg(url)
                setCarregando(0);
            });
        })
    }, []);

    console.log('urlImg',urlImg)
    function remover(){
        Swal.fire({
            title: 'Tem certeza que deseja excluir?',
            text: "Você não poderá reverter isto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, deletar'
          }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire(
                  'Deletado!',
                  'Sua receita foi deletada com sucesso!',
                  'success'
                );
                firebase.firestore().collection('receitas').doc(match.params.idPost).delete().then(()=>{
                    history.push('/post/meus');
                })
              }
          })
    }

    return(
        <>
        <div className="fundo6">
        <Menu></Menu>
        <div className="container" style={{marginTop: 200}}>
            <div className="d-flex" style={{paddingLeft: 90, paddingRight: 90, alignItems: 'center', justifyContent: 'center'}} >
                <img src={urlImg} className="img-banner" alt=""></img>

                <div className="d-flex justify-content-between" style={{marginLeft: 30 , flexWrap: 'wrap', width:300}}>
                    <div className= "box-info my-2">
                        <div className="d-flex align-items-center">
                            <img src={titulo}></img>
                            <p className="cardTitle">Título</p>
                        </div>
                        <span className="mt-3">{post.titulo}</span>
                    </div>
                    <div className= "box-info my-2">
                        <div className="d-flex align-items-center">
                            <img src={lista}></img>
                            <p className="cardTitle">Categoria</p>
                        </div>
                        <span className="mt-3">{post.categoria}</span>
                    </div>
                    <div className= "box-info my-2">
                        <div className="d-flex align-items-center">
                            <img src={lista}></img>
                            <p className="cardTitle">Data</p>
                        </div>
                        <span className="mt-3">{post.data}</span>
                    </div>
                </div>
            </div>
            
            <div className="descriptionContainer">
                <div style={{backgroundColor: '#FF4F4F', borderTopLeftRadius: 8, borderTopRightRadius: 8, padding: 16, display: 'flex',  alignItems: 'center', justifyContent: 'center'}}> 
                    <img src={livroReceitas} style={{width: 24, height: 24}}/>
                    <p style={{fontSize: 16, fontWeight: 'bold', color: 'white', marginLeft: 10}}>Modo de preparo</p>
                </div>
                <div > 
                    <p className="text-left p-5">
                        {console.log(post?.descricao?.split('*'))}
                        {post?.descricao?.split('*').map(item => item?.length > 0 && <p style={{marginBottom: 10}}>*{item}</p>)}
                    </p>
                </div>
            </div>
               
           
            <div className="box-editar">
                {usuarioLogado == post.usuario ?
                    <Link to={`/editarPost/${match.params.idPost}`} className="btn btn-default btn-lg btn-logar">
                        <img src={editar}/>
                        <p style={{marginLeft: 8}}>Editar Receita</p>
                    </Link>
                :
                null
                }
                
                {
                    usuarioLogado==post.usuario?
                    <div>
                        
                        <button className="btn btn-default btn-lg btn-logar" type="button" onClick={remover}> <img src={lixo}/><span style={{marginLeft: 8}}>Remover Receita</span> </button>
                    </div>
                    :
                    null

                }
                
                
            
            </div>
         

        </div>
        </div>
       
        
        <Rodape></Rodape>
        </>
    )
}
export default Receitas;
