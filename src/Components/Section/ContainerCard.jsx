import React, { useState, useEffect } from 'react';
import Lugar from './Card';
import Cargando from '../Cargando/Cargando';
import { Link } from 'react-router-dom';
import './ContainerCard.css';

function ContainerCard({ searchTerm }) {
  const [caracteristicasFilter, setCaracteristicasFilter] = useState('');
  const [tipoFilter, setTipoFilter] = useState('');
  const [puntuacionFilter, setPuntuacionFilter] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [paisFilter, setPaisFilter] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const baseUrl = 'https://history-hunters-evening-api.onrender.com/places';
      const url = searchTerm
        ? `${baseUrl}/search/key?name=${searchTerm}`
        : baseUrl;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          setCargando(false);
          throw new Error('Error al obtener los datos');
        }
        const result = await response.json();
        setData(result.data);
        setFilteredData(result.data);
        setCargando(false);
      } catch (error) {
        setCargando(false);
        console.error('Error en la solicitud:', error);
      }
    };

    loadData();
  }, [searchTerm]);

  useEffect(() => {
    const applyFilters = () => {
      let filteredResults = [...data];

      if (caracteristicasFilter) {
        const normalizedCaracteristicas = caracteristicasFilter.toLowerCase();
        filteredResults = filteredResults.filter((item) =>
          item.characteristics.some((char) =>
            char.toLowerCase().includes(normalizedCaracteristicas)
          )
        );
      }

      if (tipoFilter) {
        filteredResults = filteredResults.filter(
          (item) => item.type.toLowerCase() === tipoFilter.toLowerCase()
        );
      }

      if (puntuacionFilter) {
        filteredResults = filteredResults.filter(
          (item) => Math.round(item.score) === parseInt(puntuacionFilter)
        );
      }

      if (regionFilter) {
        const normalizedRegion = regionFilter.toLowerCase();
        filteredResults = filteredResults.filter((item) =>
          item.region.toLowerCase() === normalizedRegion
        );
      }

      if (paisFilter) {
        const normalizedPais = paisFilter.toLowerCase();
        filteredResults = filteredResults.filter((item) =>
          item.country.toLowerCase().includes(normalizedPais)
        );
      }

      setFilteredData(filteredResults);
    };

    applyFilters();
  }, [caracteristicasFilter, tipoFilter, puntuacionFilter, regionFilter, paisFilter, data]);

  const tipoOptions = ['Bélicos', 'Cotidianos', 'Otros'];
  const puntuacionOptions = Array.from({ length: 11 }, (_, index) => index); // Opciones del 0 al 10
  const regionOptions = ['Norte', 'Sur', 'Este', 'Oeste', 'Noreste', 'Noroeste', 'Sureste', 'Suroeste'];

  return cargando ? (
    <Cargando />
  ) : (
    <div className='page-container'>
      <h2>Opciones de filtrado</h2>
      <div className='filter-container'>
        <input
          type='text'
          placeholder='Características...'
          value={caracteristicasFilter}
          onChange={(e) => setCaracteristicasFilter(e.target.value)}
        />
        <select value={tipoFilter} onChange={(e) => setTipoFilter(e.target.value)}>
          <option value=''>Tipo</option>
          {tipoOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select
          value={puntuacionFilter}
          onChange={(e) => setPuntuacionFilter(e.target.value)}
        >
          <option value=''>Puntuación</option>
          {puntuacionOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)}>
          <option value=''>Región</option>
          {regionOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input
          type='text'
          placeholder='País...'
          value={paisFilter}
          onChange={(e) => setPaisFilter(e.target.value)}
        />
      </div>
      <div className='card-container'>
        {filteredData.map((card) => (
          <Link className='link-router' key={card.id} to={`/lugares/${card.id}`}>
            <Lugar
              imageUrl={card.images}
              name={card.name}
              description={card.description}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ContainerCard;