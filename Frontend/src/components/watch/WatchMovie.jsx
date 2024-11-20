import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../../axiosSettings/httpSetup';
import axios from 'axios';
import { toast } from 'react-toastify';

import "../../assets/styles/watchMoviePage.css";


const WatchMovie = () => {
    const location = useLocation();
    const searchValue = location.search;

    const urlParams = new URLSearchParams(searchValue);
    const movieId = urlParams.get('movieId');
    const type = urlParams.get('type');

    // console.log({ movieId, type });

    const [loading, setLoading] = useState(false);
    const [movieLink, setMovieLink] = useState("");

    // const movieId = location.search.split('?')[1];

    // console.log(movieLink);
    // const trailer = 'https://www.youtube.com/embed/XmIIgE7eSak';

    const getTrailer = async (id) => {
        setLoading(true);

        let api_url;

        if (type === "movie") api_url = `/api/v1/Category/movieTrailer?movieId=${id}`;
        else api_url = `/api/v1/Category/tvTrailer?movieId=${id}`;

        try {
            const response = await axiosInstance
                .get(
                    api_url,
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    }
                );
            // console.log({ id, response });

            const youtubeVideoId = response.data.data.key;
            const link = `https://www.youtube.com/watch?v=${youtubeVideoId}`
            // const link = 'https://www.youtube.com/watch?v=XmIIgE7eSak';
            // https://www.youtube.com/watch?v=XmIIgE7eSak

            const embeddedUrlApi = `https://www.youtube.com/oembed?url=${link}&format=json`;
            const { data } = await axios.get(embeddedUrlApi);
            const parser = new DOMParser();
            const iframe = parser.parseFromString(data.html, 'text/html')

            //@ts-ignore
            setMovieLink(iframe.body.childNodes[0].src)

        } catch (error) {
            // console.log({ error });
            toast.error(error.message);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        window.scrollTo(0, 0);

        getTrailer(movieId);
    }, [movieLink]);

    return (
        <div
            className="embed-responsive embed-responsive-16by9 iframe-container"
        >
            {loading ? (<div
                className="col-md-12"
                style={{
                    textAlign: "center", color: "rgba(155, 81, 224, 1)", position: "relative"
                }}
            >
                <i className="pi pi-spin pi-spinner loader"
                // style={{ fontSize: '5rem', position: "absolute", top: "50%" }}
                >

                </i>
            </div>) : (
                <iframe
                    // width="312px"
                    // height="30x"
                    src={movieLink}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    className=''
                    allowFullScreen
                ></iframe >
            )}

        </div >
    )
}

export default WatchMovie