import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

function AgregarLugar() {
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
            const response = await fetch('https://history-hunters-evening-api.onrender.com/places/add', {
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
            alert('El lugar se creó correctamente');
            setFormData({
                userId: sessionStorage.getItem('id'),
                name: '',
                description: '',
                address: '',
                images: [{ url: '' }],
                type: '',
                characteristics: [],
                score: 0,
                country: 'Uruguay',
                region: ''
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
        } else if (name === "characteristics") {
            setFormData({ ...formData, characteristics: value.split(',') });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    useEffect(() => {

       if(handleSubmit){
        console.log('se actualiza la página con exito');
       }
    }, [formData]);




    return (



        <Accordion>
            <Accordion.Item eventKey="1">
                <Accordion.Header><h5>Agregar Lugar</h5></Accordion.Header>
                <Accordion.Body>
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
                            <option value="Brasil">Brasil</option>
                        </Form.Select><br/>

                        <Form.Select aria-label="Default select example" name="region" value={formData.region} onChange={handleChange}>
                            <option value="Este">Norte</option>
                            <option value="Sur">Sur</option>
                            <option value="Este">Este</option>
                            <option value="Sur">Oeste</option>
                            <option value="Sur">Sureste</option>
                            <option value="Sur">Suroeste</option>
                            <option value="Sur">Noroeste</option>
                            <option value="Sur">Noreste</option>
                        </Form.Select><br/>



                        <Button type="submit" className='button' variant="secondary">Agregar lugar</Button>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>




    );
}

export default AgregarLugar;