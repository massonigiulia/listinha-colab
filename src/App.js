import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
// import { IUsuarios } from './interfaces/entity';
import Modal from 'react-modal';

// type Props = {
//   users: IUsuario[];
//   user: IUsuario | undefined;
// };

const App = () => { //props:Props

  const initialuser = {
    name: {title: "", first: "", last: ""},
    gender: "",
    email: "",
    login: {username: ""},
    cell: "",
    location: {city: ""}
  };

  const [usuarios, setUsuarios] = React.useState([]); //<IUsuarios[]>
  const [usuario, setUsuario] = React.useState(initialuser);
  const [modalIsOpen, setIsOpen] = React.useState(false);


  function listarUsuarios() {
    fetch("https://randomuser.me/api/?results=15&nat=br&inc=gender,name,location,email,login,cell,picture").then(res => {
      return res.json();
    }).then(data => {
      setUsuarios(data.results);
    });
  }

  useEffect(() => {
    listarUsuarios();
    console.log(usuarios);
  }, []);

  function openModal(usuario: any) {
    setUsuario(usuario);
    console.log(usuario);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setUsuario(initialuser);
  }

  const customStyles = {

    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width: '350px',
      height: '300px',
      transform: 'translate(-50%, -50%)',
      border: '2px solid #ff349a'
    },
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1 className="font-effect-shadow-multiple" id="title">
            Listagem de Usuários
          </h1>
        </header>
        <section className="users">
          <div>
            {usuarios.map((u, i) => {
              return (
                <a id={"user"+i} className="links" style={{ width: "20%", marginBottom: "60px", color: "#ffffff"}}>
                  <img id={"user"+i} className="fotos" src={u.picture.large} onClick={() => openModal(u)} title="Ver detalhes"></img>
                  <p className="nominhos" id={"user"+i}>{u.name.title + " " + u.name.first + " " + u.name.last}</p>
                </a>
              )
            })
            }
          </div>
        </section>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}>
          <h3 style={{ textAlign: "center", color: "#ff349a", marginTop: "5px", marginBottom: "30px" }}>{usuario.name.title + " " + usuario.name.first + " " + usuario.name.last}</h3>  
          <div className="row">
            <div className="col-7">
              <label style={{color: "#ff349a"}} htmlFor="email"><b>E-mail: </b></label>
              <label htmlFor="email">{usuario.email }</label>
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-7">
              <label style={{color: "#ff349a"}} htmlFor="gender"><b>Gênero: </b></label>
              <label htmlFor="email">{usuario.gender == "female" ? "Feminino" : "Masculino"}</label>
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-7">
              <label style={{color: "#ff349a"}} htmlFor="cell"><b>Celular: </b></label>
              <label htmlFor="email">{usuario.cell }</label>
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-7">
              <label style={{color: "#ff349a"}} htmlFor="location"><b>Cidade: </b></label>
              <label htmlFor="email">{usuario.location.city}</label>
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-7">
              <label style={{color: "#ff349a"}} htmlFor="login"><b>Login: </b></label>
              <label htmlFor="email">{usuario.login.username}</label>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default App;
