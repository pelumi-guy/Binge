import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';

const CurrentlyPlaying = ({ movies, category }) => {
    return (
        <Fade duration={3000} direction="up">
            <div className='container row mb-4'>
                <h4 className='category-title'>
                    {category}
                </h4>
                {movies.map((movie, idx) => {
                    return (
                        <div className='col-3 px-2'>
                            <Link to={`/watch?${movie.movieLink}`}>
                                <div className='playing-movie-container'>
                                    <img src={movie.cover} alt={movie.name} className='img-fluid' />
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
                                </div>
                            </Link>
                            
                        </div>
                    )
                })}

            </div>
        </Fade>
    )
}

export default CurrentlyPlaying;