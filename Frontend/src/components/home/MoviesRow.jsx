import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
import { Fade } from 'react-awesome-reveal';
import { Link, useLocation } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart } from '@fortawesome/free-regular-svg-icons';
// import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import FavouriteButton from './assets/FavouriteButton';
import axiosInstance from '../../axiosSettings/httpSetup';
import { toast } from 'react-toastify';

const imageLinkPrefix = 'https://image.tmdb.org/t/p/w500';

const MoviesRow = ({ movies, category, topRow = false }) => {

    const location = useLocation();
    // console.log({ location });

    const isFavouritePage = location.pathname === '/favourites';

    const [toggled, SetToggled] = useState(false);
    const [movieList, setMovieList] = useState(movies);
    const { auth } = useContext(AuthContext);
    const { user } = auth;
    // const favourites = user.favoriteMovies;

    const filterFavourites =() => {
        if (isFavouritePage) {
            setMovieList(prev => prev.filter(movie => movie.favourite));
        }
    }


    // const email = user.email;

    const toggleFavorite = async (movie) => {

        const movieDetails = {
            id: movie.id,
            title: movie.title,
            name: movie.type,
            overview: movie.description,
            poster_Path: movie.imageUrl,
            release_Date: movie.releaseDate,
            first_Air_Date: movie.releaseDate,
            genre_Ids: movie.genres
        };

        const requestData = JSON.stringify({
            movieDetails,
            userId: user.id
        })

        console.log({ requestData });


        var response;
        try {
            if (!movie.favourite) {
                response = await axiosInstance
                    .post(
                        '/api/v1/FavoriteMovies/SaveFavoriteMovie',
                        requestData,
                        {
                            headers: { "Content-Type": "application/json" },
                            withCredentials: true,
                        }
                    );
            } else {
                response = await axiosInstance
                    .delete(
                        `/api/v1/FavoriteMovies/remove-favorite-movie/${movie.id}/${user.id}`,
                        {
                            headers: { "Content-Type": "application/json" },
                            withCredentials: true,
                        }
                    );
            }
        } catch (error) {
            console.error(error)
            toast.error(error.message);
        } finally {
            if (response.data.succeeded) {
                movie.favourite = !movie.favourite;

                // favourites.forEach(favMovie => {
                //     if (favMovie.id === movie.id) favMovie.favourite = !favMovie.favourite;
                // })
                filterFavourites();
                SetToggled(!toggled);
            }
        }
    }

    // useEffect(() => {
    //     filterFavourites();
    // }, [filterFavourites]);

    return (
        <Fade duration={1000} direction='right'>
            <div className={`mb-4 px-5 ${topRow ? 'playing-movies' : ''}`}>
                <h4 className='category-title'>
                    {category}
                </h4>
                <div className='d-flex row'>
                    {movieList.map((movie, idx) => {
                        return (
                            <div className='px-2 col-3' key={idx}>
                                <Link to={`/watch?movieId=${movie.id}&type=${movie.type}`}>
                                    <div className='playing-movie-container'>
                                        <img src={`${imageLinkPrefix}${movie.imageUrl}`} alt={movie.title} className='img-fluid' />
                                        {topRow &&
                                            <div className="progress">
                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    style={{ width: movie.percentage }}
                                                    aria-valuenow={movie.value}
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                ></div>
                                            </div>
                                        }

                                    </div>
                                </Link>

                                <div className="d-flex justify-content-between mt-1">
                                    <span>{movie.title}</span>
                                    {!topRow && <span
                                        onClick={() => toggleFavorite(movie)}
                                    >
                                        {/* <FontAwesomeIcon icon={movie.favourite ? faHeartSolid : faHeart} /> */}
                                        <FavouriteButton favourite={movie.favourite} />
                                    </span>}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Fade>
    )
}

export default MoviesRow;