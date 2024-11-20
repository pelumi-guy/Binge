import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
// import { useNavigate } from 'react-router-dom';
import MoviesRow from './MoviesRow';
// import CurrentlyWatching from './CurrentlyWatching';
import AuthContext from '../../context/AuthProvider';
import axiosInstance from '../../axiosSettings/httpSetup';
import PlayIcon from "../../assets/images/homePage/PlayIcon.svg";
import InfoIcon from "../../assets/images/homePage/InfoIcon.svg";
import "../../assets/styles/homePage.css"
import { toast } from "react-toastify";

// import {
//     continueWatching,
//     anime,
//     thriller,
//     fMovie,
//     series,
//     tvShows,
//     korean,
//     chinese
// } from './assets/movies';

import { movieCategories, tvCategories } from './assets/categories';

const HomePage = () => {

    // const [favourites, setFavourites] = useState([]);
    const [currentlyWatching, setCurrentlyWatching] = useState([]);
    // const [movieIdSet, setMovieIdSet] = useState(new Set());

    const navigate = useNavigate();

    // const navigate = useNavigate();
    // const handleClick = () => {
    //     navigate("/");
    // };

    const { auth } = useContext(AuthContext);
    const { firstName, favoriteMovies: favourites } = auth.user;


    const addedMovies = new Set();

    useEffect(() => {
        const getMovies = async () => {
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
                    const trendingMovies = response.data.data.trendingMovies
                    const popularTvSeries = response.data.data.popularTvSeries
                    const watching = [];

                    // const addedTvSeries = new Set();

                    trendingMovies.forEach(movie => {
                        if (!addedMovies.has(movie.id)) {
                            for (const category of movieCategories) {
                                if (movie.genres.includes(category.id) && category.movies.length < 4 && !category.movies.some(existingMovie => existingMovie.id === movie.id)) {
                                    movie.isCategorised = true;
                                    category.movies.push(movie);
                                    addedMovies.add(movie.id);
                                    // setMovieIdSet(prev => new Set([...Array.from(prev), movie]));
                                    break;
                                }
                            }
                        }

                        if (movie.title === "Dune: Part Two" || movie.title === "Land of Bad") {
                            const percentage = Math.random() * 100;
                            movie.percentage = `${percentage}%`;
                            movie.value = percentage;
                            watching.push(movie);
                        }

                        movie.favourite = favourites.some(favMovie => favMovie.id === movie.id);
                    })

                    popularTvSeries.forEach(movie => {
                        if (!addedMovies.has(movie.id)) {
                            for (const category of tvCategories) {
                                if (movie.genres.includes(category.id) && category.movies.length < 4 && !category.movies.some(existingMovie => existingMovie.id === movie.id)) {
                                    movie.isCategorised = true;
                                    category.movies.push(movie);
                                    addedMovies.add(movie.id);
                                    // setMovieIdSet(prev => new Set([...Array.from(prev), movie]));
                                    break;
                                }
                            }
                        }

                        if (movie.title === "3 Body Problem" || movie.title === "X-Men '97") {
                            const percentage = Math.random() * 100;
                            movie.percentage = `${percentage}%`;
                            movie.value = percentage;
                            watching.push(movie);
                        }

                        movie.favourite = favourites.some(favMovie => favMovie.id === movie.id);
                    })

                    setCurrentlyWatching(watching);
                    // console.log({ movieCategories });
                    // console.log({ tvCategories });
                    // console.log({ currentlyWatching });

                    // setMovieIdSet(prev => new Set([...Array.from(prev), ...Array.from(addedMovies)]));
                }
            } catch (error) {
                // console.log({ error })
                toast.error(error);
            }
        }

        getMovies();
        // console.log({ addedMovies });
        // console.log("loaded movies");
        // setFavourites(favouritesFilter());
        // console.log({ favouriteMovies });

            window.scrollTo(0, 0)
    }, [])


    return (
        <div>
            <Fade duration={1500} direction="down">
                {/* <LightSpeed left> */}
                <div className="top-movie d-flex align-items-end">
                    <div className="row container-fluid ps-5" style={{ marginBottom: "150px" }}>
                        <div className="col-7 px-0">
                            <h1 className='top-movie-title'>
                                Dune: Part Two
                            </h1>
                            <p className='text-white'>
                                Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.
                            </p>
                            <h6 className="mb-3 fw-bold"
                            >
                                Adventure &nbsp; &nbsp; Movie &nbsp; &nbsp; Play &nbsp; &nbsp; 2024
                            </h6>
                        </div>

                        <div className="row mb-3">
                            <button className='btn px-4 py-2 play'
                                style={{ backgroundColor: "white", width: "10%" }}
                                onClick={() => navigate('/watch?movieId=693134&type=movie')}
                            >
                                <img src={PlayIcon} alt="play" /> &nbsp;
                                Play
                            </button>
                            &nbsp; &nbsp; &nbsp;
                            <button className='btn px-4 py-2 more-info' style={{ backgroundColor: "#333333", color: 'white', width: "15%" }}>
                                <img src={InfoIcon} alt="play" /> &nbsp;
                                More Info
                            </button>

                        </div>

                    </div>
                </div>
            </Fade>

            {/* <div className='showing-movies'>
                <MoviesRow movies={continueWatching} category={"Continue Watching for Imelda"} topRow={true} setFavourites={setFavourites} />
                <MoviesRow movies={anime} category={"ANIME"} setFavourites={setFavourites} />
                <MoviesRow movies={thriller} category={"THRILLER"} setFavourites={setFavourites} />
                <MoviesRow movies={fMovie} category={"MOVIES"} setFavourites={setFavourites} />
                <MoviesRow movies={series} category={"SERIES"} setFavourites={setFavourites} />
                <MoviesRow movies={tvShows} category={"SHOWS"} setFavourites={setFavourites} />
                <MoviesRow movies={korean} category={"KOREAN DRAMA"} setFavourites={setFavourites} />
                <MoviesRow movies={chinese} category={"CHINESE DRAMA"} setFavourites={setFavourites} />
                {favourites.length > 0 &&
                    (
                        <>
                            <hr className='line-rule align-self-center' />
                            <MoviesRow movies={favourites} category={"FAVOURITES"} setFavourites={setFavourites}/>
                        </>
                    )
                }
            </div> */}

            <div className='showing-movies'>
                {currentlyWatching.length && <MoviesRow movies={currentlyWatching} category={`Continue Watching for ${firstName}`} topRow={true} />}

                <h3 className='category-title mt-3 text-center bg-white text-black'>
                    MOVIES
                </h3>
                {movieCategories.map((category, idx) => {
                    return (<MoviesRow movies={category.movies} category={category.name}
                        key={idx} />)
                })}

                <h3 className='category-title mt-3 text-center bg-white text-black'>
                    TV SERIES
                </h3>
                {tvCategories.map((category, idx) => {
                    return (<MoviesRow movies={category.movies} category={category.name}
                        key={idx} />)
                })}
            </div>
        </div>
    )
}

export default HomePage