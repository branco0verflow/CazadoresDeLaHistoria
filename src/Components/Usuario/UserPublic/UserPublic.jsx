import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Cargando from '../../Cargando/Cargando';
import Lugar from '../../Section/Card';

function UserPublicLugar(props) {
  const [data, setData] = useState([]);
  const { datoo } = props; 
  const [cargando, setCargando ] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const url = `https://history-hunters-evening-api.onrender.com/places/user/${datoo}`;
      
      try {
        const response = await fetch(url);
        if (!response.ok) {
          setCargando(false);
          throw new Error('Error al obtener los datos');
        }
        const result = await response.json();
        setData(result.data);
        setCargando(false);
      } catch (error) {
        setCargando(false);
        console.error('Error en la solicitud:', error);
      }
    };

    loadData();
  }, [data]);

  return  cargando ? (<Cargando />) :
    ( 
    <div className='card-container'>
      {data.map((card) => (
        <Link className='link-router' to={`/lugares/${card.id}`}>
          <Lugar
            key={card.id}
            imageUrl={card.images}
            name={card.name}
            description={card.description}
          />
        </Link>
      ))}
    </div>
  )
}

export default UserPublicLugar;
