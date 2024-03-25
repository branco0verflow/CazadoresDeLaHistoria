import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Cargando from "../../Cargando/Cargando";
import './InfoCard.css';
import Rating from '@mui/material/Rating';
import AddReview from "../../AgregaReview/AgregaReview";
import Reviews from "../../Reviewss/Reviewss";
import { Button, Modal } from "react-bootstrap";
import ModificarLugar from "../ModificarLugar/ModificarLugar";

function InfoCard() {
    const [data, setData] = useState(null);
    const [dataUser, setDataUser] = useState(null);
    const { IdLugar } = useParams();
    const [reviews, setReviews] = useState([]);
    const [dejoReview, setDejoReview] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            const url = 'https://history-hunters-evening-api.onrender.com/places/' + IdLugar;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const result = await response.json();
                setData(result.data);
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        };

        loadData();
    }, []);



    useEffect(() => {

        if (data) {
            const loadDataa1 = async () => {
                const url2 = `https://history-hunters-evening-api.onrender.com/users/profile/${data.userId}`;

                try {
                    const response2 = await fetch(url2);
                    if (!response2.ok) {
                        throw new Error('Error al obtener los datos');
                    }
                    const result2 = await response2.json();
                    setDataUser(result2.data);
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                }
            };

            loadDataa1();
        }
    }, [data]);

    useEffect(() => {

        if (data) {
            const loadDataReview = async () => {
                try {
                    const urlReviews = 'https://history-hunters-evening-api.onrender.com/reviews';
                    const responseReviews = await fetch(urlReviews);
                    if (!responseReviews.ok) {
                        throw new Error('Error al obtener los datos');
                    }
                    const resultReviews = await responseReviews.json();
                    const reviewsSinFiltrar = resultReviews.data;
                    const reviewsParaEsteSitio = reviewsSinFiltrar.filter((review) => review.placeId === Number(IdLugar));


                    setReviews(reviewsParaEsteSitio);
                    setDejoReview(false);
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                }
            }

            loadDataReview();
        }




    }, [data, dejoReview]);


    const handleSubmitDelete = async (e) => {
        e.preventDefault();
        try {
            const url = 'https://history-hunters-evening-api.onrender.com/places/delete/' + IdLugar;
    
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            window.location.assign('/lugares');
            
    
            const data = await response.json();
            console.log('Respuesta del servidor:', data);
        } catch (error) {
            console.error('Error al enviar la solicitud DELETE:', error);
        }
    };


    return data ? (
        <>
            <div className="info-contenedor">
                <img className="imagen" src={data.images[0].url} alt={data.name} />
                <div className="texto">
                    <Button variant="primary" onClick={handleShow}>
                        Modificar
                    </Button>
                    <Button variant="primary" onClick={handleSubmitDelete}>
                        Eliminar
                    </Button>
                    <h2><strong>Nombre: </strong>{data.name}</h2>
                    <p><strong>Descripción: </strong>{data.description}</p>
                    <p><h4>Valoración: </h4><span>{<Rating name="half-rating-read" defaultValue={data.score} max={10} precision={1} readOnly />}</span></p>
                    <p>De tipo: {data.type}</p>
                    <p><strong>Ubicación - </strong>País: {data.country}, Región: {data.region}</p>
                    <Link to={`/usuario/${data.userId}`}>{dataUser && <h5>Creado por {dataUser.name} {dataUser.lastName}</h5>}</Link>
                    {reviews.length > 0 && (<Reviews reviews={reviews} />)}
                    <AddReview placeId={IdLugar} onChange={setDejoReview} />

                </div>
            </div>
            <div>
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ModificarLugar />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    ) : (<Cargando />)
}

export default InfoCard;