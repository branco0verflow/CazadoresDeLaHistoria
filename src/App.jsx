import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavScrollExample from './Components/Header/BarraNav'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import ContainerCard from './Components/Section/ContainerCard';
import InfoCard from './Components/Section/InfoCard/InfoCard';
import Objetos from './Components/Objetos/Objetos';
import Login from './Components/Login/Login';
import Usuario from './Components/Usuario/Usuario';
import Registro from './Components/Registro/Registro';
import InfoObjectCard from './Components/Objetos/InfoObjetos';
import Inicio from './Components/Inicio/Inicio';
import Footer from './Components/Footer/Footer';  

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavScrollExample onSearch={handleSearch} />} >
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/lugares" element={<ContainerCard searchTerm={searchTerm} />} />
            <Route path="/lugares/:IdLugar" element={<InfoCard />} />
            <Route path="/objetos" element={<Objetos searchTerm={searchTerm} />} />
            <Route path="/objetos/:IdObjeto" element={<InfoObjectCard />} />
            <Route path="/usuario/:userId" element={<Usuario />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registrate" element={<Registro />} />

            <Route path="*" element={<div>Pagina no encontrada</div>} />
          </Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;