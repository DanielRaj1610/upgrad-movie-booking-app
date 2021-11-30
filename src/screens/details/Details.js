import React, {useEffect, useState} from 'react';
import './Details.css';
import {Button, GridList, GridListTile, GridListTileBar, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {useGlobals} from "../../common/store";
import CircularProgress from "@material-ui/core/CircularProgress";
import YouTube from "react-youtube";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Header from "../../common/header/Header";


function Details() {

    const {baseUrl} = useGlobals();
    const [movie, setMovie] = useState({});
    const [rating, setRating] = useState(0);
    const [isMovieFetched, setIsMovieFetched] = useState(false);
    useEffect(() => {
        const getMovieDetails = async () => {
            const response = await fetch(`${baseUrl}/movies/${window.location.pathname.split("/").pop()}`);
            const movieJson = await response.json();
            setMovie(movieJson);
            setIsMovieFetched(true);
        }
        getMovieDetails();
    }, [])

    return (
        <div>
            <Header baseUrl={window.location.pathname}/>
            {isMovieFetched ? (
                    <div className={'details'}>
                        <div className={'backHome'}>
                            <Button component={Link} to={`/`}> {'<'} Back to Home</Button>
                        </div>
                        <div className={'detailsSection'}>
                            <div className={'detailsPoster'}>
                                <div className={'poster'}>
                                    <img src={movie.poster_url} alt={`poster${movie.title}`}/>
                                </div>
                            </div>
                            <div className={'detailsContent'}>
                                <Typography variant={'h2'}>{movie.title}</Typography>
                                <Typography><b>Genre: </b>{movie.genres.join(',')}</Typography>
                                <Typography><b>Duration: </b>{movie.duration}</Typography>
                                <Typography><b>Release Date: </b>{new Date(movie.release_date).toDateString()}</Typography>
                                <Typography><b>Rating: </b>{movie.rating}</Typography>
                                <Typography style={{marginTop: '16px'}}><b>Plot:</b> <a href={`${movie.wiki_url}`}>(Wiki
                                    Link)</a>{movie.storyline}
                                </Typography>
                                <Typography style={{marginTop: '16px'}}><b>Trailer:</b></Typography>
                                <YouTube opts={{width: '100%'}}
                                         videoId={`${movie.trailer_url.split("v=")[1].split("&")[0]}`}/>
                            </div>
                            <div className={'detailsCasts'}>
                                <Typography><b>Rate this movie: </b></Typography>
                                <div>
                                    <StarBorderIcon style={{color: rating >= 1 ? "yellow" : "black", cursor: "pointer"}}
                                                    onClick={() => {
                                                        setRating(1)
                                                    }}/>
                                    <StarBorderIcon style={{color: rating >= 2 ? "yellow" : "black", cursor: "pointer"}}
                                                    onClick={() => {
                                                        setRating(2)
                                                    }}/>
                                    <StarBorderIcon style={{color: rating >= 3 ? "yellow" : "black", cursor: "pointer"}}
                                                    onClick={() => {
                                                        setRating(3)
                                                    }}/>
                                    <StarBorderIcon style={{color: rating >= 4 ? "yellow" : "black", cursor: "pointer"}}
                                                    onClick={() => {
                                                        setRating(4)
                                                    }}/>
                                    <StarBorderIcon style={{color: rating >= 5 ? "yellow" : "black", cursor: "pointer"}}
                                                    onClick={() => {
                                                        setRating(5);
                                                    }}/>
                                </div>
                                <Typography style={{marginTop: '16px'}}><b>Artists: </b></Typography>
                                <GridList cols={2}>
                                    {movie.artists.map((item) => (
                                            <GridListTile key={item.profile_url}>
                                                <img src={item.profile_url} alt={item.first_name + ' ' + item.last_name}/>
                                                <GridListTileBar
                                                    title={item.first_name + ' ' + item.last_name}
                                                />
                                            </GridListTile>
                                        )
                                    )}
                                </GridList>
                            </div>

                        </div>

                    </div>
                )
                : <CircularProgress color={'secondary'}/>}
        </div>

    )
}

export default Details;