import React, { useEffect } from "react";
import "../../assets/styles/landing.css";
// import feature1 from "../../assets/images/landing/MissionImpossible_DeadReckoning.jpg";
// import feature2 from "../../assets/images/landing/Oppenheimer-Movie.jpg";
// import feature3 from "../../assets/images/landing/Transformers_RiseoftheBeasts.jpg";
import feature1 from "../../assets/images/landing/Feature1.svg";
import feature2 from "../../assets/images/landing/Feature2.svg";
import feature3 from "../../assets/images/landing/Feature3.svg";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import FavouriteFilms from "./FavouriteFilms";
import fav1 from '../../assets/images/landing/favorite1.svg';
import fav2 from '../../assets/images/landing/favorite2.svg';
import fav3 from '../../assets/images/landing/favorite3.svg';


const Landing = () => {
  // const showToast = () => {
  //   toast.success("React toastify works!");
  // };
  // <button onClick={showToast}>Click here</button>
  // const [favFilms, setFavFilms] = useState([]);
  // const {loading, films, error} = useSelector(state => state.films);
  // useEffect(() =>{g
  //   dispatchEvent(getFilms());
  // }, [dispatch]);
  // useEffect(() => {
  //   const sortFilms = () => {
  //     let favourites = []
  //     films.forEach(film => {
  //       if (film.popular && favourites.length <3) favourites.push(film);

  //     });
  //     setFavFilms(favourites);
  //   };
  //   sortFilms();
  // }, [films]);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="home">
      <Fade duration={2000} direction="down">
        {/* <LightSpeed left> */}
        <div className="static">
          <div className="welcome">
            <h1 className="">
              Welcome to Bin
              <span style={{ color: "rgba(155, 81, 224, 1)" }}>ge!</span>
            </h1>
            <div className=" mt-3 cap">
              <Link to='/signup'>
                <button
                  className="join py-4 fs-5"
                  type="button"
                  onClick={handleClick}
                  style={{ width: '100%' }}
                >
                  Wanna Join Binge? Sign Up
                </button>
              </Link>

              <Link to='/subscription'>
                <button
                  className="free-trial py-4 fs-5"
                  type="button"
                  onClick={handleClick}
                  style={{ width: '100%' }}
                >
                  Start 7-day Free Trial
                </button>
              </Link>

            </div>
          </div>
        </div>
      </Fade>

      <div className="container-lg">
        {/* <Fade duration={1000} direction="down"> */}
        <div className="favouriteSection">
          <h1 className="fs-1 fw-bolder favourite-1">
            Watch your <span style={{ color: "#9B51E0" }}>Favourites</span>
          </h1>
          <p className="favourite-2">
            Explore a vast library of movies, from timeless classics to the latest blockbusters.
          </p>
          <div className="row" style={{ color: "white" }}>
            {/* <FavouriteFilms />
              <FavouriteFilms />
              <FavouriteFilms /> */}
            <div className="col-4 fav-movies-container" onClick={() => navigate('/tvSeries')} style={{ cursor: 'pointer' }}>
              <img src={fav1} style={{ width: "100%" }} alt="favourite tv series" />
              <div className="fav-movies-title">
                <div className="fav-title-header1">New & Classics</div>
                <div className="fav-title-header2">Series</div>
              </div>
            </div>
            <div className="col-4 fav-movies-container" onClick={() => navigate('/movies')} style={{ cursor: 'pointer' }}>
              <img src={fav2} style={{ width: "100%" }} alt="favourite movies" />
              <div className="fav-movies-title">
                <div className="fav-title-header1">Popular</div>
                <div className="fav-title-header2">Movie</div>
              </div>
            </div>
            <div className="col-4 fav-movies-container" onClick={() => navigate('/tvSeries')} style={{ cursor: 'pointer' }}>
              <img src={fav3} style={{ width: "100%" }} alt="favourite tv series" />
              <div className="fav-movies-title">
                <div className="fav-title-header1">New & Classics</div>
                <div className="fav-title-header2">Series</div>
              </div>
            </div>
          </div>

          {/* <section id="most-picked">
                <div
                    className="mt-5 mb-2 home-title">Favourites
                </div>

                {films && <MostPicked films={favFilms} />}
            </section> */}
        </div>
        {/* </Fade> */}
        {/* <Fade duration={1000} direction="down"> */}
        <div>
          <div className="features">
            <h1 className="fs-1 fw-bolder">
              Our <span style={{ color: "#9B51E0" }}>Prominent</span> Features
            </h1>
            <p className="text-white">
              Discover a world of endless entertainment with our feature-packed streaming application!
            </p>
          </div>
          <div className="row featureFilms">
            <div className="col-4">
              <img src={feature1} style={{ width: "100%" }} alt="Favourites-1" />

              <h2 style={{ color: "white" }}>Access your Favourite Movies</h2>
              <p style={{ color: "white" }}>
                Rediscover your favorite films anytime, anywhere!
              </p>
            </div>
            <div className="col-4">
              <img src={feature2} style={{ width: "100%" }} alt="Favourites-2" />
              <h2 style={{ color: "white" }}>Explore Watch Party</h2>
              <p style={{ color: "white" }}>
                Dive into curated collections and themed playlists for every mood and occasion with friends and family{" "}
              </p>
            </div>
            <div className="col-4">
              <img src={feature3} style={{ width: "100%" }} alt="Favourites-3" />
              <h2 style={{ color: "white" }}>Convenient Payment Options</h2>

              <p style={{ color: "white" }}>
                Experience hassle-free movie streaming with our convenient payment options!{" "}
              </p>
            </div>
          </div>
        </div>
        {/* </Fade> */}
        {/* <Fade duration={1000} direction="down"> */}
        <div>
          <div className="features">
            <h1 className="fs-1 fw-bolder">
              Affordable <span style={{ color: "#9B51E0" }}>Plans </span>For You
            </h1>
            <p className="text-white">
              For as low as N1,600, unlock a world of cinematic delights with our affordable plans! Enjoy unlimited access to our extensive movie library!
            </p>
          </div>
          <div className="row d-flex justify-content-evenly subscribe">
            <div className="col-3 subscription1 ps-4 pb-5">
              <h3 className="mt-5" style={{ color: "orange" }}>
                Basic
              </h3>
              <h2 style={{ color: "white" }}>
                <span style={{ fontSize: "small", textAlign: "center" }}>
                  ₦
                </span>
                1,600
                <span style={{ fontSize: "small", textAlign: "center" }}>
                  /month
                </span>
              </h2>
              <p style={{ color: "white" }}>
                Say goodbye to sky-high subscription fees and hello to great entertainment at a pocket-friendly price.
              </p>
              {/* <a href="#" class="btn btn-lg btn-outline-primary">
            Free 7-days Trial
          </a> */}
              <button className="button3">Free 7-days Trial</button>

              <h4 className="my-4" style={{ color: "orange" }}>
                Core Features
              </h4>
              <div>
                <ul className="orange">
                  <li className="O">Rich Member Profile</li>
                  <li className="O">Rich Member Profile</li>
                  <li className="O">Rich Member Profile</li>
                  <li className="O">Rich Member Profile</li>
                  <li className="O">Rich Member Profile</li>
                  <li className="O">Rich Member Profile</li>
                  <li className="O">Rich Member Profile</li>
                </ul>
              </div>
            </div>

            <div class="col-3 subscription2 ">
              <div
                style={{ backgroundColor: "indigo", backgroundSize: "cover" }}
              >
                <h4 style={{ textAlign: "center" }}>Most Popular</h4>
              </div>
              <div className="ps-4 pb-5 mt-4">
                <h3 style={{ color: "indigo" }}>Premium</h3>
                <h2 style={{ color: "white" }}>
                  <span style={{ fontSize: "small" }}>₦</span>3,700
                  <span style={{ fontSize: "small" }}>/month</span>
                </h2>
                <p style={{ color: "white" }}>
                  Enjoy premium streaming. Join today and elevate your movie-watching experience without breaking the bank!
                </p>
                {/* <a href="#" class="btn btn-primary py-2 px-4">
              Free 7-days Trial
            </a> */}
                <button className="button2">Free 7-days Trial</button>

                <h4 className="my-4" style={{ color: "indigo" }}>
                  Core Features
                </h4>
                <div>
                  <ul className="indigo">
                    <li className="i">Rich Member Profile</li>
                    <li className="i">Rich Member Profile</li>
                    <li className="i">Rich Member Profile</li>
                    <li className="i">Rich Member Profile</li>
                    <li className="i">Rich Member Profile</li>
                    <li className="i">Rich Member Profile</li>
                    <li className="i">Rich Member Profile</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="col-3 subscription3">
              <h4
                className="text-center"
                style={{ backgroundColor: "rgb(255, 98, 0)" }}
              >
                Best Deal
              </h4>
              <div className="ps-4 pb-5 mt-4">
                <h3 style={{ color: "rgb(255, 98, 0)" }}>Standard</h3>
                <h2 style={{ color: "white" }}>
                  <span style={{ fontSize: "small", textAlign: "center" }}>
                    ₦
                  </span>
                  3,500
                  <span style={{ fontSize: "small", textAlign: "center" }}>
                    /month
                  </span>
                </h2>
                <p style={{ color: "white" }}>
                  Whether you're a casual viewer or a die-hard cinephile, there's a plan tailored just for you.
                </p>
                <button className="button">Free 7-days Trial</button>
                <h4 className="my-4" style={{ color: "rgb(255, 98, 0)" }}>
                  Core Features
                </h4>
                <div>
                  <ul className="dark-orange">
                    <li className="d-o">Rich Member Profile</li>
                    <li className="d-o">Rich Member Profile</li>
                    <li className="d-o">Rich Member Profile</li>
                    <li className="d-o">Rich Member Profile</li>
                    <li className="d-o">Rich Member Profile</li>
                    <li className="d-o">Rich Member Profile</li>
                    <li className="d-o">Rich Member Profile</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </Fade> */}
        {/* <Fade duration={1000} direction="down"> */}
        <div>
          <div className="text-center mt-4" style={{ color: "white" }}>
            <h1>Questions?</h1>
            <p>We've got Answers</p>
          </div>

          <div class="accordion accordion-flush pb-3 text-white" id="accordionFlushExample" style={{ backgroundColor: "black" }}>
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingOne">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  How does Binge work?
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">
                  Binge offers a seamless and intuitive user experience. Simply sign up or log in with your  details, and you're ready to dive into the world of movies!
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingTwo">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo"
                  aria-expanded="false"
                  aria-controls="flush-collapseTwo"
                >
                 How can I subscribe
                </button>
              </h2>
              <div
                id="flush-collapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingTwo"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">
                To subscribe, just choose a plan after signing up or logging in,  and navigate to make  payment.
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingThree">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseThree"
                  aria-expanded="false"
                  aria-controls="flush-collapseThree"
                >
                  What is the average subscription payment package?
                </button>
              </h2>
              <div
                id="flush-collapseThree"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingThree"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">
                The average subscription on  Binge is 2940. You can stream on Binge for as low as 1600
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </Fade> */}
      </div>

    </div>
  );
};

export default Landing;
