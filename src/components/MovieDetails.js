import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom'
import { Row, Col } from 'react-grid-system'
import Header from './layout/Header'
import uuidv4 from 'uuid/v4';
import VerticallyCenteredModal from './layout/VerticallyCenteredModal'
import Button from 'react-bootstrap/Button'

export const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500/"
export const LOCAL_STORAGE_KEY = 'movieApp.movies';

const MovieDetails = () => {
    const location = useLocation()
    const [myMovies, setMyMovies] = useState([])
    const [modalShow, setModalShow] = useState(false);

    useEffect(() =>{
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(myMovies))
    }, [myMovies])

    const getCurrentDate = () => {
        var currentDate = new Date();
        var dd = String(currentDate.getDate()).padStart(2, '0');
        var mm = String(currentDate.getMonth() + 1).padStart(2, '0'); //January is 0
        var yyyy = currentDate.getFullYear();

        currentDate = mm + '/' + dd + '/' + yyyy;

        return currentDate
    }

    const addMovieToList = (e) =>{
        const movieItem = location.state;
    
        setMyMovies(prevMovies =>{
            return [...prevMovies, {id: uuidv4(), movie: {movieItem}, date: getCurrentDate()}]
        })
    }

    return (
        <div className="movie-details section">
            <Header/>
            <div className="movie-backdrop-img" id="movie-backdrop-img" 
            style={{backgroundImage: `url(${IMG_BASE_URL + location.state.backdrop_path})`}}>
                <div className="wrapper">
                    <h1 className="movie-details-title">{location.state.original_title}</h1>
                    <span style={{fontSize: '30px', color: '#ccc', fontWeight: '600'}}> ({location.state.release_date.slice(0, 4)})</span>
                </div>
            </div>

            <div className="container">
                <Row>
                    <Col lg={3}>
                        <img src={IMG_BASE_URL + location.state.poster_path} className="movie-details-poster"></img>
                    </Col>
                    <Col>
                        <ul className="movie-details-top-stats horizontal-ul">
                            <li><span className="average-rating">{location.state.vote_average}</span></li>
                            <li><span style={{marginLeft: '-50px', fontSize: '18px', color: '#ccc'}}>/ {location.state.vote_count} votes</span></li>
                            <li><p className="tag">Popularity: <b>{Math.round(location.state.popularity)}</b></p></li>
                            <li><Button variant="success" onClick={() => setModalShow(true)}>Add to list</Button></li>
                        </ul>
                        <div className="movie-details-bottom-stats">
                            <p className="subtitle">Language:</p>
                            <p className="description" style={{fontSize: '14px', textTransform: 'uppercase'}}>{location.state.original_language}</p>
                            
                            <p className="subtitle">Release date:</p>
                            <p className="description" style={{fontSize: '14px'}}>{location.state.release_date}</p>
                            
                            <p className="subtitle">Description:</p>
                            <p className="description" style={{fontSize: '14px'}}>{location.state.overview}</p>
                        </div>
                    </Col>
                </Row>
            </div>

            <VerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
        </div>
    )
}

export default MovieDetails
