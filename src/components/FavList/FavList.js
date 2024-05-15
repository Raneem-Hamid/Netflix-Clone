import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';



function FavList() {

    const [getMovies, setGetMovies] = useState([]);

  const trendingMovie = async () => {
    const serverURL = `https://movies-library-c37e.onrender.com/getMovies`;
    // const serverURL = `https://movies-library-6ldd.onrender.com/allMovies`;
    const res = await fetch(serverURL);
    const jsonRes = await res.json();
    setGetMovies(jsonRes);
    console.log(jsonRes);
  }

  useEffect(() => {
    trendingMovie();
  }, []);


  const deleteItem = async (id) => {
    const res = await fetch(`https://movies-library-6ldd.onrender.com/deelteMovie/${id}`, { method: "DELETE" });
 //    const res = await fetch(`http://localhost:3001/deelteMovie/${id}`, { method: "DELETE" });
    if (res.ok) {
        setGetMovies((prevMovies) => prevMovies.filter(movie => movie.id !== id));
    }
}



const handleUpdate = async (movieId, updatedComment) => {
    const updatedMovies = getMovies.map(movie => {
         if (movie.id === movieId) {
              return { ...movie, comment: updatedComment };
         }
         return movie;
    });
    setGetMovies(updatedMovies);

  const serverURL = `https://movies-library-6ldd.onrender.com/updateMovie/${movieId}`;
    // const serverURL = `http://localhost:3001/updateMovie/${movieId}`;
    const res = await fetch(serverURL, {
         method: "PUT",
         headers: {
              "Content-Type": "application/json"
         },
         body: JSON.stringify({ comment: updatedComment })
    });

    if (!res.ok) {
         // Handle error
    }
};

const [editingMovieId, setEditingMovieId] = useState(null);
const [newComment, setNewComment] = useState("");

const startEditing = (id, comment) => {
    setEditingMovieId(id);
    setNewComment(comment);
}

const cancelEditing = () => {
    setEditingMovieId(null);
    setNewComment("");
}

const submitUpdate = async (id) => {
    await handleUpdate(id, newComment);
    setEditingMovieId(null);
    setNewComment("");
}


  return (
    <>

<Row xs={1} md={4} className="g-5">

{getMovies.map((movie) => (
    <Col key={movie.id} className="movie-col">
               

    <Card style={{ width: '17rem' }}>
          <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg`}  />
   
          {console.log(movie.poster_path)}
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>

            {editingMovieId === movie.id ? (
                                             <>
                                                  <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                                                  <Button variant="primary" onClick={() => submitUpdate(movie.id)}>Submit</Button>
                                                  <Button variant="secondary" onClick={cancelEditing}>Cancel</Button>
                                             </>
                                        ) : (
                                             <>
                                                  <Card.Text >{movie.comment}</Card.Text>
                                                  <div className="btns">
                                                       <Button className="btn d" onClick={() => deleteItem(movie.id)}>Delete</Button>
                                                       <Button className="btn ed" onClick={() => startEditing(movie.id, movie.comment)}>Update</Button>
                                                  </div>
                                             </>)}

          </Card.Body>
        </Card>
                </Col>
))}
    </Row>
    
                </>
  )
}

export default FavList