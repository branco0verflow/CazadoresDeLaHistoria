import React, { useState, useEffect } from 'react';
import { Rating, Stack } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router-dom";


function ModificarLugar() {
    const { IdLugar } = useParams();
    const [formData, setFormData] = useState({
        userId: sessionStorage.getItem('id'),
        name: '',
        description: '',
        address: '',
        images: [{ url: '' }],
        type: '',
        characteristics: [],
        score: 1,
        country: 'Uruguay',
        region: ''
    });



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = 'https://history-hunters-evening-api.onrender.com/places/update/' + IdLugar;
    
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            window.location.assign('/lugares/' + IdLugar);

            
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
        } else if (name === "characteristics") {
            setFormData({ ...formData, characteristics: value.split(',') });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };



    return (

        <Form className="text-light" onSubmit={handleSubmit}>
                        

                        <Form.Control type="text" placeholder="Nombre" name="name" value={formData.name} onChange={handleChange} /><br/>
                        <Form.Control type="text" placeholder="Descripción del Lugar" name="description" value={formData.description} onChange={handleChange} /><br/>
                        <Form.Control type="text" placeholder="Ubicación" name="address" value={formData.address} onChange={handleChange} /><br/>
                        <Form.Control type="text" placeholder="Ingresa URL de la imágen aquí" name="images" value={formData.images[0].url} onChange={handleChange} /><br/>
                        <Form.Control type="text" placeholder="Características del Lugar" name="characteristics" value={formData.characteristics} onChange={handleChange} /><br/>

                        <div className='puntuacion'>
                            <Stack spacing={1} value={formData.score} onChange={handleChange}>
                                <Rating size="large" name="score" defaultValue={3} precision={1} max={10} />
                            </Stack>

                        </div><br/>

                        <Form.Select aria-label="Default select example" name="type" value={formData.type} onChange={handleChange}>
                            <option value="Belicos">Bélicos</option>
                            <option value="Cotidianos">Cotidianos</option>
                            <option value="Otros">Otros</option>
                        </Form.Select><br/>

                        <Form.Select aria-label="Default select example" name="country" value={formData.country} onChange={handleChange}>
                            <option value="Uruguay">Uruguay</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Brasil">Brasil 🇧🇷 <span>🇧🇷</span></option>
                        </Form.Select><br/>

                        <Form.Select aria-label="Default select example" name="region" value={formData.region} onChange={handleChange}>
                            <option value="Este">Este</option>
                            <option value="Sur">Sur</option>
                        </Form.Select><br/>
                        <Button type="submit" className='button' variant="secondary">Modificar lugar</Button>
                    </Form>

    );

}

export default ModificarLugar;