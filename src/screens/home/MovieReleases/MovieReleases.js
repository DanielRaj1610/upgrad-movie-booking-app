import { Card, CardContent, GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import './MovieReleases.css';
import MovieFilters from './MovieFilters/MovieFilters';
import { useMovieReleases } from '../Store';


const styles = theme => ({
    root: {
        height: '350px',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    overallTile: {
        cursor: 'pointer',
        margin: '1rem'
    },
    overallGrid: {
        margin: "2rem"
    },
    card: {
        padding: '1rem'
    },
    cardtitle: {
        fontSize: 16,
        color: theme.palette.primary.light
    },
    title: {
        color: '#ffffff',
    },
    titleBar: {
        background: 'linear-gradient(180deg, rgba(189,195,199,1) 0%, rgba(0,0,0,0.700717787114846) 100%)'
    },
});



const MovieReleases = (props) => {
    const { classes } = props;
    // const [movies, setMovies] = useState([]);
    const { movies, ismoviesLoaded } = useMovieReleases();


    // useEffect(() => {
    //     const fetchMovie = async () => {
    //         const response = await fetch("http://localhost:8085/api/v1/movies?page=1&status=RELEASED")
    //         const json = await response.json();
    //         // setstartMovies(json);
    //         console.log(json.movies)
    //         if (json.movies) {
    //             setMovies([...json.movies]);
    //         }
    //     }
    //     fetchMovie();

    // }, []);

    const dateConversion = (value) => {

        let dateObject = new Date(Date.parse(value));
        return dateObject.toDateString();

    }

    return (
        ismoviesLoaded > 0 ?
            <div className='movieReleases'>
                <div className='movies'>
                    <GridList cellHeight={350} cols={4} classes={{ root: classes.overallGrid }}>
                        {movies.map((tile, index) => (
                            <GridListTile key={`${tile.img}-${index}`} classes={{ root: classes.overallTile }} onClick={() => console.log(tile)}>
                                <img src={tile.poster_url} className='gridImage' alt={tile.title} />
                                <GridListTileBar
                                    title={tile.title}
                                    subtitle={<span>Release Date: {dateConversion(tile.release_date)}</span>}
                                    classes={{
                                        root: classes.titleBar,
                                        title: classes.title,
                                    }}
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
                <div className='filters'>
                    <Card className={classes.card}>
                        <CardContent>
                            <MovieFilters movies={movies} />
                        </CardContent>
                    </Card>
                </div>

            </div> : ''
    );
}

export default withStyles(styles)(MovieReleases);