import React from 'react';
import './caixa-email.css';
import { Link } from 'react-router-dom';
function Caixa() {
  // Fonte https://stackoverflow.com/questions/4782068/can-i-set-subject-content-of-email-using-mailto
  const href_email = 'mailto:h4bituei.o@gmail.com';
  return (
    <div className="mandar-email">
      <div className="centro">
        <div className="box-mandar-email">
          <div className="caixa-mandar-email">
            <div className="content-caixa">
              <span className="mandar-email-text">
                Enviei um e-mail <br></br>sobre o que você achou do <br></br>projeto!
              </span>
              {/* <form className="form" action="https://mail.google.com/" method="POST">
                <div className="mandar-email-input-box">
                  <div className="mandar-email-icon">
                    <input type="text" name="" value="" className="mandar-email-input" placeholder="digitar e-mail"></input>
                  </div>
                </div>
                <div className="mandar-email-submit-box">
                  <span className="glyphlcon glyphlcon-send">
                    <input type="submit" name="" value="" className="mandar-email-submit"></input>
                  </span>
                </div>
              </form> 
              <div className="limpar"></div>*/}
             {/* TODO:  resolver se vai ser um botam mesmo as vai ser um newsfeed*/}
            <button target="_blank" type="button" class="btn-enviar">
                <span className="btn-send-icon" aria-hidden="true"></span>
                <a href="https://mail.google.com/" target="_blank" className="menu__link">Clique aqui 🚀</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Caixa;
