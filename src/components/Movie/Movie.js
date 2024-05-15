import React, { useState } from 'react';
import ModalMovie from '../ModalMovie/ModalMovie.js';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import './Movie.css';


function Movie(props) {
    const [showModal, setShowModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [comment, setComment] = useState('');

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedMovie(null);
        setComment('');
    };

    const handleAddToFavorites = (movie) => {
        setSelectedMovie(movie);
        setShowModal(true);
    };

   
    return (
        <>
            <Col key={props.id} className="movie-col">
               

<Card style={{ width: '17rem' }}>
      <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${props.image}`}  />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
       
         <Button  onClick={() => handleAddToFavorites(props)}>Add to Favorites</Button>
      </Card.Body>
    </Card>
            </Col>
            <ModalMovie
                showModal={showModal}
                handleModalClose={handleModalClose}
                selectedMovie={selectedMovie}
                comment={comment}
                setComment={setComment}
            />
        </>
    );
}

export default Movie;
