import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router-dom";


function ModificarObjeto() {
    const [lugares, setLugares] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const { IdObjeto } = useParams();
    const [formData, setFormData] = useState({
        userId: Number(sessionStorage.getItem('id')),
        placeId: 1,
        name: '',
        description: '',
        date: '',
        images: [{ url: '' }],
        type: 'Belicos',
        city: '',
        country: 'Uruguay',
        region: 'Este'
    });

    useEffect(() => {
        const loadData = async () => {
            const url = 'https://history-hunters-evening-api.onrender.com/places';

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const result = await response.json();
                setLugares(result.data);
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        };

        loadData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = 'https://history-hunters-evening-api.onrender.com/founds/update/' + IdObjeto;
    
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            window.location.assign('/objetos/' + IdObjeto);
            const data = await response.json();
            console.log('Respuesta del servidor:', data);
        } catch (error) {
            console.error('Error al enviar la solicitud PUT:', error);
        }
    };
    
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "images") {
            setFormData({ ...formData, images: [{ url: value }] });
        } else if (name === "placeId") {
            setFormData({ ...formData, placeId: Number(value) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };



    return (

        <Form className="text-light" onSubmit={handleSubmit}>


            <Form.Select aria-label="Default select example" name="placeId" value={formData.placeId} onChange={handleChange}>
                {lugares.map((lugar) => (
                    <option value={lugar.id}>{lugar.name}</option>
                ))}
            </Form.Select>
            <br />
            <Form.Control type="text" placeholder="Nombre" name="name" value={formData.name} onChange={handleChange} />
            <br />
            <Form.Control type="text" placeholder="Descripción del Lugar" name="description" value={formData.description} onChange={handleChange} />
            <br />

            <Form.Control type="text" placeholder="Ingresa URL de la imágen aquí" name="images" value={formData.images[0].url} onChange={handleChange} />
            <br />
            <Form.Control type="text" placeholder="Ciudad" name="city" value={formData.city} onChange={handleChange} />
            <br />
            <Form.Control type="date" placeholder="Fecha" name="date" value={formData.city} onChange={handleChange} />
            <br />
            <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
            <br />
            <Form.Select aria-label="Default select example" name="type" value={formData.type} onChange={handleChange}>
                <option value="Belicos">Bélicos</option>
                <option value="Cotidianos">Cotidianos</option>
                <option value="Otros">Otros</option>
            </Form.Select>
            <br />
            <Form.Select aria-label="Default select example" name="country" value={formData.country} onChange={handleChange}>
                <option value="Uruguay">Uruguay</option>
                <option value="Argentina">Argentina</option>
                <option value="Brasil">Brasil</option>
            </Form.Select>
            <br />
            <Form.Select aria-label="Default select example" name="region" value={formData.region} onChange={handleChange}>
                <option value="Este">Este</option>
                <option value="Sur">Oeste</option>
            </Form.Select>
            <br />
            <Button type="submit" className='button' variant="secondary">Modificar objeto</Button>


        </Form>
    );

}

export default ModificarObjeto;