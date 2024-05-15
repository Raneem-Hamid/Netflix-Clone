import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './ModalMovie.css';

function ModalMovie(props) {

   



    return (
        <Modal show={props.showModal} onHide={props.handleModalClose} className="modal-container">
            <Modal.Header closeButton>
                <Modal.Title>{props.selectedMovie && props.selectedMovie.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.selectedMovie && <img src={`https://image.tmdb.org/t/p/w500${props.selectedMovie.image}`} alt="title" className="modal-image" />}
                {props.selectedMovie && props.selectedMovie.overview}
                <textarea
                    className="form-control mt-3"
                    rows="3"
                    placeholder="Add your comment..."
                    value={props.comment}
                    onChange={(e) => props.setComment(e.target.value)}
                ></textarea>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleModalClose}>Close</Button>
                <Button variant="primary" >Save changes</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalMovie;