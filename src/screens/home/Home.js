import React, { useEffect, useState } from 'react';
import SingleLineGridList from '../home/GridList/GridList';
import MovieReleases from '../home/MovieReleases/MovieReleases';
import MovieReleasesProvider from '../home/Store';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Home.css';


function Home() {


    const [startMovies, setstartMovies] = useState([])

    useEffect(() => {
        const fetchMovie = async () => {
            const response = await fetch("/api/v1/movies?page=1&limit=6")
            const json = await response.json();
            let value = [];
            console.log(json.movies)
            if (json.movies) {
                json.movies.forEach(item => {
                    value.push({ title: item.title, img: item.poster_url })
                });
            }
            setstartMovies([...value]);
        }
        fetchMovie();

    }, []);


    return (

        <div>
            <div className='homeBar'>
                <p className='homeBar_text'>Upcoming Movies</p>
            </div>
            <div className='movieGrids'>
                {startMovies.length !== 0 ? <SingleLineGridList data={startMovies} /> : <CircularProgress color="secondary" />}
            </div>
            <MovieReleasesProvider>
                <MovieReleases />
            </MovieReleasesProvider>
        </div>);
}

export default Home;