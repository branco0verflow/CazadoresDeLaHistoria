import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Cargando from '../../Cargando/Cargando';
import ObjetoCard from '../../Objetos/ObjetoCard';
import { Button } from 'react-bootstrap';

function UserPublicObjetos(props) {
  const [data, setData] = useState([]);
  const { datoo } = props; 
  const [cargando, setCargando ] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const url = `https://history-hunters-evening-api.onrender.com/founds/user/${datoo}`;
      
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
        {data.map((object) => (
          <Link className='link-router' to={`/objetos/${object.id}`}>
            <ObjetoCard
              key={object.id}
              imageUrl={object.images}
              name={object.name}
              description={object.description}
            />
          </Link>
          
        ))}
      </div>
  )
}

export default UserPublicObjetos;