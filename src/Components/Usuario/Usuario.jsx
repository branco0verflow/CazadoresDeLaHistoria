import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cargando from '../Cargando/Cargando';
import './Usuario.css';
import UserPublicLugar from '../Usuario/UserPublic/UserPublic';
import UserPublicObjetos from './UserPublic/UserPublicObjeto';
import AgregarLugar from './AgregarContenido/AgregarLugar';
import AgregarObjeto from './AgregarContenido/AgregarObjetos';

function Usuario() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const perfilPropio = userId === sessionStorage.getItem('id');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://history-hunters-evening-api.onrender.com/users/profile/${userId}`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos del usuario');
        }
        const result = await response.json();
        setUserData(result.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (isLoading) {
    return <Cargando />;
  }

  if (!userData) {
    return <div>No se encontraron datos para este usuario</div>;
  }

  return (
    <>
      <div className="user-profile">
        <div className="profile-picture">
          <img src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png" alt="Profile" />
        </div>
        <div className="user-details">
          {perfilPropio ? <h2>Mi Perfil</h2> :
            <h2>Perfil de Usuario</h2>}
          <p>Nombre: {userData.name}</p>
          <p>Apellido: {userData.lastName}</p>
          <p>Id: {userData.id}</p>
        </div>
      </div>

      <div className='AddDiv'>
        {perfilPropio && (<div className='agregarLugar'><AgregarLugar /></div>)}
        {perfilPropio && (<div className='agregarObjeto'><AgregarObjeto /></div>)}
      </div>
      <div className="add-location-objects">
        <h3>Publicaciones: </h3>
        {<UserPublicLugar datoo={userId} />}
        {<UserPublicObjetos datoo={userId} />}
      </div>
    </>
  );
}

export default Usuario;