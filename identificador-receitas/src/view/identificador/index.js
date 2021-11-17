import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './identificador.css';
import { Link } from 'react-router-dom';
import firebase from '../../config/firebase';
import 'firebase/auth';
import Menu from '../../componets/menu';
import Rodape from '../../componets/rodape';
import Login from '../login';
import Caixa from '../../componets/caixa-email';
import ReceitaCard from '../../componets/receitaCard';
import Bolinhas from '../../componets/bolinhas';

const pageLength = 5;

const Identificador = function ({ match }) {
  const [receitas, setReceitas] = useState([]);
  const [listaReceitas, setListaReceitas] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const usuarioEmail = useSelector((state) => state.usuarioEmail);
  const [pages, setPages] = useState(1);

  const [recipeData, setRecipeData] = useState({page: 1, pages: 1, data: []});

  let tmplistaReceitas = [];
  useEffect(() => {
    if (match && match.params.parametro) {
      firebase
        .firestore()
        .collection('receitas')
        .where('usuario', '==', usuarioEmail)
        .get()
        .then(async (resultado) => {
          await resultado.docs.forEach((doc) => {
            if (doc.data().titulo.indexOf(pesquisa) >= 0) {
              tmplistaReceitas.push({
                id: doc.id,
                ...doc.data(),
              });
            }
          });

          setListaReceitas(tmplistaReceitas);
        });
    } else {
      firebase
        .firestore()
        .collection('receitas')
        .get()
        .then(async (resultado) => {
          await resultado.docs.forEach((doc) => {
            if (doc.data().titulo.indexOf(pesquisa) >= 0) {
              tmplistaReceitas.push({
                id: doc.id,
                ...doc.data(),
              });
            }
          });

          setListaReceitas(tmplistaReceitas);
        });
    }
  }, []);


  useEffect(() => {
    if (listaReceitas && listaReceitas.length && pesquisa && typeof pesquisa === 'string') {
      let tmp_achadas = listaReceitas.filter((receita) => {
//         console.log(receita);
        // debugger;
        let tpm_titulo = new RegExp(pesquisa.normalize('NFD'), 'gi');
        if ((receita.titulo && receita.titulo.normalize('NFD').match(tpm_titulo)) || (receita.descricao && receita.descricao.normalize('NFD').match(tpm_titulo))) {
          return receita;
        }
      });

      return () => {
        setReceitas(tmp_achadas);
        setPages(Math.ceil(tmp_achadas.length / pageLength));
      };
    } else if (listaReceitas && listaReceitas.length) {
      //#endregion
      return () => {
        setReceitas(listaReceitas);
      };
    }
  }, [pesquisa]);

  useEffect(() => {
    if (listaReceitas) {
      setPages(Math.ceil(listaReceitas.length / pageLength));
      const dataArray = [];
      
      for(let i = (pageLength * (recipeData?.page-1)); i < pageLength * recipeData.page; i++){
        dataArray.push(listaReceitas[i])
      }
      setRecipeData({...recipeData, pages: Math.ceil(listaReceitas.length / pageLength), data: dataArray})
      // setReceitas(listaReceitas);

    } else return () => {};
  }, [listaReceitas]);

  useEffect(()=> {
    if(recipeData?.data?.length > 0){
      setReceitas(recipeData.data);
    }
  }, [recipeData, recipeData.data])

  const changePage = (newPage) => {
    const dataArray = [];     
    for(let i = (pageLength * (newPage)); i < pageLength * (newPage+1); i++){
      if(listaReceitas[i] !== undefined)
        dataArray.push(listaReceitas[i])
    }
    setRecipeData({page: newPage+1, pages: Math.ceil(listaReceitas.length / pageLength), data: dataArray})
  }

  const renderBolinhas =  ()=> {
    const bolinhas = [];
    for(let i = 0; i < pages; i++){
      bolinhas.push(<Bolinhas active={recipeData?.page === i+1} onClick={() => changePage(i)}/>)
    }
    return bolinhas
  }

  return (
    <div className="fundo">
      <div className="centro">
        <Menu />
        <div className="ingredientes">
          <div className="centro">
            <div className="box-colocar-ingredientes">
              <div className="caixa-mandar-email">
                <div className="content-caixa">
                  <span className="mandar-email-text">Informe qual a receita que você está procurando 👉</span>
                  <form className="form">
                    <div className="mandar-email-input-box">
                      <div className="mandar-email-icon">
                        <input onChange={(e) => setPesquisa(e.target.value)} type="text" className="mandar-email-input" placeholder="digite o nome da receita" />
                      </div>
                    </div>
                    <div className="mandar-email-submit-box">
                      <span className="glyphlcon glyphlcon-search">
                        <input type="button" name="" value="" className="buscar" />
                      </span>
                    </div>
                  </form>
                  <div className="limpar" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="posts-receitas">
        <div className="centro">
          <h2 className="minha-historia">Aqui estão as receitas</h2>
          <h5 className="minha-descricao">Legal, né?! 🥰 </h5>
        </div>
      </div>
      <div className="row">
        {receitas.map((item) => (
          <ReceitaCard key={item?.id} id={item?.id} titulo={item?.titulo} descricao={item?.descricao} imagens={item?.imagens} />
        ))}
      </div>
      
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
        {renderBolinhas()}
      </div>
      

      <br />
      <br />
      <br />
      <br />

      <Rodape />
    </div>
  );
};
export default Identificador;
