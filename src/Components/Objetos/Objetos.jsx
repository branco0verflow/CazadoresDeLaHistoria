import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ObjetoCard from './ObjetoCard';
import Cargando from '../Cargando/Cargando';
import './Objetos.css';

function Objetos({ searchTerm }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Estado para los filtros
  const [tipoFilter, setTipoFilter] = useState('');
  const [fechaInicioFilter, setFechaInicioFilter] = useState(null);
  const [fechaFinFilter, setFechaFinFilter] = useState(null);
  const [regionFilter, setRegionFilter] = useState('');
  const [paisFilter, setPaisFilter] = useState('');
  const [sitioHistoricoFilter, setSitioHistoricoFilter] = useState('');
  
  useEffect(() => {
    const loadData = async () => {
      const baseUrl = 'https://history-hunters-evening-api.onrender.com/founds';
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

      if (tipoFilter) {
        filteredResults = filteredResults.filter(
          (item) => item.type.toLowerCase() === tipoFilter.toLowerCase()
        );
      }

      if (fechaInicioFilter) {
        // Filtrar por fecha de inicio
        filteredResults = filteredResults.filter(
          (item) => new Date(item.createdAt) >= fechaInicioFilter
        );

        // Filtrar por fecha fin (si está seleccionada)
        if (fechaFinFilter) {
          filteredResults = filteredResults.filter(
            (item) => new Date(item.createdAt) <= fechaFinFilter
          );
        }
      }

      if (regionFilter) {
        const normalizedRegion = regionFilter.toLowerCase();
        filteredResults = filteredResults.filter((item) =>
          item.region.toLowerCase().includes(normalizedRegion)
        );
      }

      if (paisFilter) {
        const normalizedPais = paisFilter.toLowerCase();
        filteredResults = filteredResults.filter((item) =>
          item.country.toLowerCase().includes(normalizedPais)
        );
      }

      if (sitioHistoricoFilter) {
        const normalizedSitioHistorico = sitioHistoricoFilter.toLowerCase();
        filteredResults = filteredResults.filter((item) =>
          item.description.toLowerCase().includes(normalizedSitioHistorico)
        );
      }

      setFilteredData(filteredResults);
    };

    applyFilters();
  }, [tipoFilter, fechaInicioFilter, fechaFinFilter, regionFilter, paisFilter, sitioHistoricoFilter, data]);

  const tipoOptions = ['Bélicos', 'Cotidianos', 'Otros'];

  return cargando ? (
    <Cargando />
  ) : (
    <div className='page-container'>
      <h2>Opciones de filtrado</h2>
      <div className='filter-container'>
        <select value={tipoFilter} onChange={(e) => setTipoFilter(e.target.value)}>
          <option value=''>Tipo</option>
          {tipoOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <DatePicker
          selected={fechaInicioFilter}
          onChange={(date) => setFechaInicioFilter(date)}
          placeholderText='Fecha Inicio'
          dateFormat='dd/MM/yyyy'
          isClearable
        />
        <DatePicker
          selected={fechaFinFilter}
          onChange={(date) => setFechaFinFilter(date)}
          placeholderText='Fecha Fin'
          dateFormat='dd/MM/yyyy'
          minDate={fechaInicioFilter} // Bloquea fechas anteriores a la fecha de inicio
          disabled={!fechaInicioFilter} // Deshabilita si no hay fecha de inicio seleccionada
          isClearable
        />
        <select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)}>
          <option value=''>Región</option>
          <option value='Norte'>Norte</option>
          <option value='Sur'>Sur</option>
          <option value='Este'>Este</option>
          <option value='Oeste'>Oeste</option>
          <option value='Noreste'>Noreste</option>
          <option value='Noroeste'>Noroeste</option>
          <option value='Sureste'>Sureste</option>
          <option value='Suroeste'>Suroeste</option>
        </select>
        <input
          type='text'
          placeholder='País...'
          value={paisFilter}
          onChange={(e) => setPaisFilter(e.target.value)}
        />
        <input
          type='text'
          placeholder='Sitio Histórico...'
          value={sitioHistoricoFilter}
          onChange={(e) => setSitioHistoricoFilter(e.target.value)}
        />
      </div>
      <div className='card-container'>
        {filteredData.map((object) => (
          <Link className='link-router' key={object.id} to={`/objetos/${object.id}`}>
            <ObjetoCard
              key={object.id}
              imageUrl={object.images}
              name={object.name}
              description={object.description}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Objetos;