import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
import BackButton from '../../assets/reusable_components/BackButton';
import axiosInstance from '../../axiosSettings/httpSetup';
import { toast } from 'react-toastify';
import MoviesRow from '../home/MoviesRow';
import SmallLoader from '../../assets/reusable_components/SmallLoader';


const TvSeries = () => {
    const [movieList, setMovieList] = useState([]);
    const [loading, setLoading] = useState(false);

    const { auth } = useContext(AuthContext);
    const { favoriteMovies: favourites } = auth.user;

    useEffect(() => {
        const getMovies = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance
                    .get(
                        '/api/v1/Category/movieCategories',
                        {
                            headers: { "Content-Type": "application/json" },
                            withCredentials: true,
                        }
                    );

                if (response.data.succeeded) {
                    const trendingSeries = response.data.data.popularTvSeries;
                    trendingSeries.forEach((movie) => {
                        movie.favourite = favourites.some(favMovie => favMovie.id === movie.id);
                    })

                    setMovieList(trendingSeries);
                }
                else {
                    toast.error(response.data.message)
                }
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false);
            }
        }

        getMovies();
    }, [])

    return (
        <div className='container-fluid px-5 favourites-container'>
            <BackButton />

            <h1 className='my-list mb-4'>Trending TV Series</h1>
            {loading ?
                (<SmallLoader />) :
                (<MoviesRow movies={movieList} category={""} />)}
        </div>
    )
}

export default TvSeries;