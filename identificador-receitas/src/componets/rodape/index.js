import React from 'react';
import './rodape.css';
import { Link } from 'react-router-dom';
function Rodape (){
    return(
        <div className="rodape">
                    <div className="centro">
                        <div className="rodape-box">
                            <p className="rodape-descricao">Essa aplicação tem como propósito<br></br>
                                encontrar receitas culinárias <br></br>através dos  
                                ingredientes que o usuário <br></br>possui em casa.
                            </p>
                        </div>
                        <div className="rodape-menu"> 
                            <strong className="rodape-titulo">Termos</strong>
                            <ul>
                                <li className="rodape-menu-item"><a href="https://github.com/julianaoliveiras/software-maintenance/tree/main/identificador-receitas" target="_blank" className="rodape-link">Docs</a></li>
                                <li className="rodape-menu-item"><a href="https://github.com/julianaoliveiras/software-maintenance/tree/main/identificador-receitas" target="_blank" className="rodape-link">Suporte Informações</a></li>
                                <li className="rodape-menu-item"><a href="https://github.com/julianaoliveiras/software-maintenance/tree/main/identificador-receitas" target="_blank" className="rodape-link">Privacidade</a></li>
                                <li className="rodape-menu-item"><a href="https://github.com/julianaoliveiras/software-maintenance/tree/main/identificador-receitas" target="_blank" className="rodape-link">Gerenciar cookies</a></li>
                            </ul>
                        </div>
                        <div className="rodape-menu">
                            <strong className="rodape-titulo">Paginas</strong>
                            <ul>
                                <li className="rodape-menu-item"><a href="https://github.com/julianaoliveiras/" target="_blank" className="rodape-link">GitHub</a></li>
                                <li className="rodape-menu-item"><a href="https://www.linkedin.com/in/oliveira-juliana-/" target="_blank" className="rodape-link">LinkedIn</a></li>
                                <li className="rodape-menu-item"><a href="https://www.facebook.com/julliana.oliveira.9674" target="_blank" className="rodape-link">Facebook</a></li>
                                <li className="rodape-menu-item"><a href="https://www.youtube.com/" target="_blank" className="rodape-link">Youtube</a></li>
                            </ul>
                        </div>
                        <div className="rodape-menu">
                            <strong className="rodape-titulo">Contato</strong>
                            <ul>
                                <li className="rodape-menu-item"><Link to="/contato" className="rodape-link">Fale Conosco</Link></li>
                                <li className="rodape-menu-item"><Link to="/contato" className="rodape-link">Endeços</Link></li>
                                <li className="rodape-menu-item"><Link to="/contato" className="rodape-link">SAC</Link></li>
                                <li className="rodape-menu-item"><Link to="/sobre" className="rodape-link">Dúvidas</Link></li>
                            </ul>
                        </div>
                        <div className="limpar"></div>
                        <div className="autor">
                            <p> Por <a href="https://github.com/julianaoliveiras/" target="_blank" className="fim">Juliana</a></p>
                        </div>
                    </div>
        </div>
    )
}
export default Rodape;