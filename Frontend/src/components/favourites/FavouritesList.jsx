import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
import axiosInstance from '../../axiosSettings/httpSetup';

import MoviesRow from '../home/MoviesRow';
import SmallLoader from '../../assets/reusable_components/SmallLoader';

import "./assets/styles/favourites.css";
import { toast } from 'react-toastify';

import BackButton from '../../assets/reusable_components/BackButton';

const FavouriteMovies = ({ movieList }) => {
    return (
        <>
            {movieList.length === 0 ?
                <p className='lead text-center mb-5'
                style={{ color: 'whitesmoke' }}
                >
                    You don't have any favourite movies saved yet.</p>
                : <MoviesRow movies={movieList} category={""} />}
        </>
    )

}

const FavouritesList = () => {
    const { auth } = useContext(AuthContext);
    const { user } = auth;

    const [movieList, setMovieList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getFavourites = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance
                    .get(
                        `/api/v1/FavoriteMovies/get-favorite-movies/${user.id}`,
                        {
                            headers: { "Content-Type": "application/json" },
                            withCredentials: true,
                        }
                    );

                if (response.data.succeeded) {
                    console.log({ response: response.data.data });

                    const favs = response.data.data;
                    favs.forEach((movie) => {
                        movie.imageUrl = movie.poster_Path
                        movie.type = movie.name
                        movie.favourite = true
                    })
                    setMovieList(favs);
                }
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }

        getFavourites();
    }, [user.id])

    return (
        <div className='container-fluid px-5 favourites-container'>
            <BackButton />

            <h1 className='my-list mb-4'>My List</h1>
            {loading ?
                (<SmallLoader />) :
                (<FavouriteMovies movieList={movieList} />)
                }
        </div>
    )
}

export default FavouritesList;