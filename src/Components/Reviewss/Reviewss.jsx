import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import './Reviewss.css';

function Reviews({ reviews }) {
    const [userNames, setUserNames] = useState({});

    useEffect(() => {
        const fetchUserNames = async () => {
            try {
                const userIds = reviews.filter(review => review.userId !== null).map(review => review.userId);
                const promises = userIds.map(userId =>
                    fetch(`https://history-hunters-evening-api.onrender.com/users/profile/${userId}`)
                        .then(response => response.json())
                        .then(result => ({
                            userId,
                            name: result.data.name + " " + result.data.lastName
                        }))
                        .catch(error => {
                            console.error('Error fetching user data:', error);
                            return { userId, name: "User Not Found" };
                        })
                );
                const userData = await Promise.all(promises);
                const userNamesMap = {};
                userData.forEach(user => {
                    userNamesMap[user.userId] = user.name;
                });
                setUserNames(userNamesMap);
            } catch (error) {
                console.error('Error fetching user names:', error);
            }
        };

        fetchUserNames();
    }, [reviews]);

    return (
        <div>
    <h2>Comentarios</h2>
    {reviews.map((review) => (
        <div key={review.id} className="review-container">
            <p className='resenaUsuario'><Link to={`/usuario/${review.userId}`}>{userNames[review.userId]}</Link></p>
            <p>Reseña: {review.review}</p>
            <div className="rating-container">
                <span className="rating-label">Calificación:</span>
                <Rating name="half-rating-read" value={review.rating} max={10} precision={0.5} readOnly />
            </div>
        </div>
    ))}
</div>

    );
}



export default Reviews;