import React, { useState, useEffect } from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';


function AgregarObjeto() {
    const [lugares, setLugares] = useState([]);
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
            const response = await fetch('https://history-hunters-evening-api.onrender.com/founds/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Error!');
            }
            const result = await response.json();
            console.log(result.data);
            alert('Información enviada correctamente');
            setFormData({
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
        } catch (error) {
            console.error('Hubo un error al enviar la información', error);
            alert('Error al enviar la información');
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


        <Accordion>
            <Accordion.Item eventKey="1">
                <Accordion.Header><h5>Agregar Objeto</h5></Accordion.Header>
                <Accordion.Body>
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
                            <option value="Este">Norte</option>
                            <option value="Sur">Sur</option>
                            <option value="Este">Este</option>
                            <option value="Sur">Oeste</option>
                            <option value="Sur">Sureste</option>
                            <option value="Sur">Suroeste</option>
                            <option value="Sur">Noroeste</option>
                            <option value="Sur">Noreste</option>
                        </Form.Select>
                        <br />
                        <Button type="submit" className='button' variant="secondary">Agregar objeto</Button>


                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>



    );
}

export default AgregarObjeto;