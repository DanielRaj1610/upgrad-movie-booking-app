import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';


export const MovieReleasesContext = createContext({});

export function useMovieReleases() {
    return useContext(MovieReleasesContext);
}

export default function MovieReleasesProvider({
                                                  children,
                                              }) {

    const [movies, setMovies] = useState([]);
    const [ogMoviesValues, setogMoviesValues] = useState([]);
    const [ismoviesLoaded, setismoviesLoaded] = useState(false);

    const updateMovies = (value) => setMovies([...value]);


    useEffect(() => {
        const fetchMovie = async () => {
            const response = await fetch("/api/v1/movies?page=1&status=RELEASED")
            const json = await response.json();
            // setstartMovies(json);
            console.log(json.movies)
            if (json.movies) {
                setMovies([...json.movies]);
                setogMoviesValues([...json.movies])
                setismoviesLoaded(true);
            }
        }
        fetchMovie();
    }, []);

    return (
        <MovieReleasesContext.Provider
            value={{movies, ismoviesLoaded, updateMovies, ogMoviesValues}}
        >
            {children}
        </MovieReleasesContext.Provider>
    );
}