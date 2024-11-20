import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
import axiosInstance from '../../axiosSettings/httpSetup';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BackButton from '../../assets/reusable_components/BackButton';
import MoviesRow from '../home/MoviesRow';
import SmallLoader from '../../assets/reusable_components/SmallLoader';


const SearchResult = ({ movieList }) => {
  return (
      <>
          {movieList.length === 0 ?
              <p className='lead text-center mb-5'
              style={{ color: 'whitesmoke' }}
              >
                  Sorry, we couldn't find any movies or TV series matching your search terms.</p>
              : <MoviesRow movies={movieList} category={""} />}
      </>
  )

}

const MovieSearch = () => {

  const params = useParams();
  const keyword = decodeURIComponent(params.keyword)

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
            `/api/v1/Category/movie-search?keyword=${keyword}`,
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );

        if (response.data.succeeded) {
          const foundMovies = response.data.data;
          foundMovies.forEach((movie) => {
            movie.favourite = favourites.some(favMovie => favMovie.id === movie.id);
          })

          setMovieList(foundMovies);
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
    // console.log({ keyword });
    // console.log({ params });
  }, [])

  return (
    <div className='container-fluid px-5 favourites-container'>
      <BackButton />

      <h1 className='my-list mb-4'>Search Results</h1>
      {loading ?
        (< SmallLoader/>) :
        (<SearchResult movieList={movieList} />)}
    </div>
  )

}

export default MovieSearch