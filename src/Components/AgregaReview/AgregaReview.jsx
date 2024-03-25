import react, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Button from 'react-bootstrap/Button';
import './AgregarReviews.css';

function AddReview(props) {

  const estaLogueado = sessionStorage.getItem('id');

  const [reviewData, setReviewData] = useState({
    userId: sessionStorage.getItem('id'),
    rating: 7,
    review: '',
    placeId: props.placeId,
    foundId: props.foundId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://history-hunters-evening-api.onrender.com/reviews/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });
      if (!response.ok) {
        throw new Error('Error!');
      }
      const result = await response.json();
      console.log(result.data);
      setReviewData({
        userId: sessionStorage.getItem('id'),
        rating: 7,
        review: '',
        placeId: props.placeId,
        foundId: props.foundId,
      });
      props.onChange(true);
    } catch (error) {
      console.error('Hubo un error al enviar la información', error);
      alert('Error al enviar la información');
    }
  }

  return ( estaLogueado ? ( 
    
    <form onSubmit={handleSubmit}>
      <h2>Deja un comentario</h2>
      <FloatingLabel controlId="floatingInput" label="Escribe aquí un comentario" className="mb-3" >
        <Form.Control type="textarea" name="review" placeholder="Escribe aquí un comentario" value={reviewData.review} onChange={handleChange} />
      </FloatingLabel>

      <Stack spacing={1} onChange={handleChange}>
        <Rating size="large" name="rating" value={reviewData.rating} precision={1} max={10} onChange={(event, newValue) => {
          setReviewData({ ...reviewData, rating: newValue });
        }} />
      </Stack>

      <Button type="submit" className='buttonReview' variant="secondary">Comentar</Button>
    </form>
  ) : (<div><h5>Debes iniciar sessión para dejar un comentario</h5></div>)
      
  );
}

export default AddReview;