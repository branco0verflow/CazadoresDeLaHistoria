import React, { useEffect } from 'react';
import './Inicio.css';
import Fondo from '../../images/Captutapng.png';
import Button from 'react-bootstrap/Button';

const Inicio = () => {
  useEffect(() => {
    const handleScroll = () => {
      const body = document.body;
      const scrollPosition = window.scrollY;

      if (scrollPosition > 100) {
        body.style.backgroundColor = "#f0f0f0";
      } else {
        body.style.backgroundColor = "white";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const redirectToRegister = () => {
    window.location.assign('/registrate');
  };

  const redirectToPlaces = () => {
    window.location.assign('/lugares');
  };

  return (
    <div className="con-fondo">
      <img className='con-fondo' src={Fondo} alt="Fondo" />
      <div className="social-icons">
      <Button variant="primary" onClick={redirectToRegister}>Si aún no tienes cuenta registrate aquí</Button>{' '}
        <Button variant="info" onClick={redirectToPlaces}>Explora lugares históricos</Button>{' '}
      </div>
    </div>
  );
}

export default Inicio;
