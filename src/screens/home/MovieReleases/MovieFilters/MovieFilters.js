import { Button, Checkbox, FormControl, FormHelperText, Input, InputLabel, ListItemText, MenuItem, Select, TextField, Typography, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './MovieFilters.css';
import { useFormik } from 'formik';
import { useMovieReleases } from '../../Store';


const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        maxWidth: 300
    },
    cardtitle: {
        fontSize: 16,
        color: theme.palette.primary.light
    },

});

const MovieFilters = (props) => {

    const { classes } = props;

    const { movies, updateMovies } = useMovieReleases();
    const [genres, setGenres] = useState([]);
    const [artist, setartist] = useState([]);

    const validation = (movieName, genre, artist, releaseDateEnd, releaseDateStart) => {
        const filteredval = [];

        if (movieName !== '') {
            movies.forEach(item => {
                const filterExists = filteredval.includes(item)
                if (item.title.includes(movieName) && !filterExists) {
                    filteredval.push(item)
                    console.log(filteredval)
                }
            })
        }

        if (genre.length > 0) {
            movies.forEach(item => {
                const found = genre.some(r => item.genres.includes(r))
                const filterExists = filteredval.includes(item)
                if (found && !filterExists) {
                    filteredval.push(item)
                    console.log(filteredval)
                }
            });
        }

        if (artist.length > 0) {
            movies.forEach(item => {
                // if(item.genre.includes())
                const found = item.artists.some(t => {
                    const name = `${t.first_name} ${t.last_name}`;
                    if (artist.includes(name)) {
                        return true
                    }
                    return false
                })
                const filterExists = filteredval.includes(item)
                if (found && !filterExists) {
                    filteredval.push(item)
                    console.log(filteredval)
                }
            });
        }


        function formatCourseDate(date) {
            const dateObj = new Date(date + 'T00:00:00');
            return new Intl.DateTimeFormat('en-US').format(dateObj);
        }

        if (releaseDateEnd !== '' && releaseDateStart !== '') {
            const dateFrom = formatCourseDate(releaseDateStart);
            const dateTo = formatCourseDate(releaseDateEnd);


            const d1 = dateFrom.split("/");
            const d2 = dateTo.split("/");


            const from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);
            const to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);

            if (from > to) {
                alert("Release Date Start value cannot be greater than Release Date end value")
                throw new Error("Release Date Start value cannot be greater than Release Date end value");
            }
            movies.forEach(item => {
                const dateCheck = formatCourseDate(item.release_date);
                const c = dateCheck.split("/");
                const check = new Date(c[2], parseInt(c[1]) - 1, c[0]);
                console.log(check > from && check < to)

            })
        } else {
            alert("Both Release Start Date and Release End Date is required")
            throw new Error("Both Release Start Date and Release End Date is required");
        }


        if (filteredval.length > 0) {
            updateMovies([...filteredval]);
        } else {
            alert("Filters are empty");
        }

    }

    useEffect(() => {
        const fetchFilters = async () => {
            const genresList = await fetch("http://localhost:8085/api/v1/genres");
            const genrejson = await genresList.json();

            console.log(genrejson.genres)
            if (genrejson.genres) {
                setGenres([...genrejson.genres]);
            }

            const artistList = await fetch("http://localhost:8085/api/v1/artists");
            const artistjson = await artistList.json();
            // setstartMovies(json);

            console.log(artistjson.artists)
            if (artistjson.artists) {
                setartist([...artistjson.artists]);
            }
        }

        fetchFilters();

    }, [])

    const formik = useFormik({
        initialValues: {
            movieName: '',
            genre: [],
            artist: [],
            releaseDateStart: '',
            releaseDateEnd: ''
        },
        onSubmit: ({ movieName, genre, artist, releaseDateEnd, releaseDateStart }) => {
            validation(movieName, genre, artist, releaseDateEnd, releaseDateStart);
        },
    });



    return (
        <div className='filterForm'>
            <Typography className={classes.cardtitle} gutterBottom>
                FIND MOVIES BY:
            </Typography>
            <form autoComplete='off' onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();
            }}>
                <FormControl className={classes.formControl} variant='filled' fullWidth error={formik.touched.movieName && Boolean(formik.errors.movieName)}>
                    <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                    <Input
                        id="movieName"
                        placeholder='Movie Name'
                        name='movieName'
                        value={formik.values.userName}
                        onChange={formik.handleChange}
                        aria-describedby="movieName"
                    />
                    <FormHelperText id="movieName-error-text">{formik.touched.movieName && formik.errors.movieName}</FormHelperText>
                </FormControl>
                {genres.length > 0 ?
                    <FormControl className={classes.formControl} variant='filled' fullWidth error={formik.touched.genre && Boolean(formik.errors.genre)}>
                        <InputLabel htmlFor="genre">Genres</InputLabel>
                        <Select
                            multiple
                            value={formik.values.genre}
                            onChange={(e) => formik.handleChange(e)}
                            aria-describedby="genre"
                            name='genre'
                            input={<Input id="genre" />}
                            renderValue={selected => selected.join(', ')}
                        >
                            {genres.map(item => (
                                <MenuItem key={item.id} value={item.genre}>
                                    <Checkbox checked={formik.values.genre.indexOf(item.genre) > -1} />
                                    <ListItemText primary={item.genre} />
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText id="genre-error-text">{formik.touched.genre && formik.errors.genre}</FormHelperText>
                    </FormControl> : ''}
                {artist.length > 0 ?
                    <FormControl className={classes.formControl} variant='filled' fullWidth error={formik.touched.artist && Boolean(formik.errors.artist)}>
                        <InputLabel htmlFor="artist">Artists</InputLabel>
                        <Select
                            multiple
                            value={formik.values.artist}
                            onChange={(e) => formik.handleChange(e)}
                            aria-describedby="artist"
                            name='artist'
                            input={<Input id="artist" />}
                            renderValue={selected => selected.join(', ')}
                        >
                            {artist.map(item => (
                                <MenuItem key={item.id} value={`${item.first_name} ${item.last_name}`}>
                                    <Checkbox checked={formik.values.artist.indexOf(`${item.first_name} ${item.last_name}`) > -1} />
                                    <ListItemText primary={`${item.first_name} ${item.last_name}`} />
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText id="artist-error-text">{formik.touched.artist && formik.errors.artist}</FormHelperText>
                    </FormControl> : ''}
                <TextField
                    id="date"
                    label="Release Date Start"
                    type="date"
                    name="releaseDateStart"
                    className={classes.formControl}
                    fullWidth
                    value={formik.values.releaseDateStart}
                    onChange={(e) => formik.handleChange(e)}
                    error={formik.touched.releaseDateStart && Boolean(formik.errors.releaseDateStart)}
                    helperText={formik.touched.releaseDateStart && formik.errors.releaseDateStart}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="date"
                    label="Release Date End"
                    type="date"
                    name="releaseDateEnd"
                    className={classes.formControl}
                    fullWidth
                    value={formik.values.releaseDateEnd}
                    onChange={(e) => formik.handleChange(e)}
                    error={formik.touched.releaseDateEnd && Boolean(formik.errors.releaseDateEnd)}
                    helperText={formik.touched.releaseDateEnd && formik.errors.releaseDateEnd}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button color='primary' variant='contained' type="submit">Apply</Button>
                {/* <Button onClick={() => updateMovies([...ogMoviesValues])}>Clear Filters</Button> */}
            </form>
        </div>
    );
}


MovieFilters.propTypes = {
    movies: PropTypes.array.isRequired
}

export default withStyles(styles)(MovieFilters);