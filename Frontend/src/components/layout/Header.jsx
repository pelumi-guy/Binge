import React, { useContext } from "react";
import Logo from "./Logo";
import Search from "./Search";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";

import "./assets/styles/layout.css";
import BellIcon from "../../assets/images/homePage/BellIcon.svg";
import EditProfileIcon from "../../assets/images/layout/EditProfileIcon.svg";
import LogoutIcon from "../../assets/images/layout/LogoutIcon.svg";

import DefaultAvatar from "../../assets/images/userprofile/PImage.png";

const Header = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const location = useLocation();
  const path = location.pathname;
  // console.log({ location });

  const logoutHandler = () => {
    // console.log('login out...');
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setAuth({ isAuthenticated: false });
  };

  return (
    <header className="container-fluid pt-0 mt-0">
      <nav className="navbar navbar-expand-lg row px-4">
        <div className="d-block d-lg-none d-flex col-12 justify-content-between">
          <Logo />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            {/* {
              !path.includes('watch') &&
              ()
            } */}

            <div className="col-5">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {auth.isAuthenticated && (
                  <li className="nav-item">
                    <Link
                      className="nav-link text-white"
                      aria-current="page"
                      to="/home"
                    >
                      Home
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link
                    className="nav-link text-white"
                    aria-current="page"
                    to="/movies"
                  >
                    Movies
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white"
                    aria-current="page"
                    to="/tvSeries"
                  >
                    Tv series
                  </Link>
                </li>
                {/* <li className="nav-item">
                <Link className="nav-link text-white" aria-current="page" to="#!">Downloads</Link>
                </li> */}
                <li className="nav-item">
                  <Link
                    className="nav-link text-white"
                    aria-current="page"
                    to="/favourites"
                  >
                    My List
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-2 d-none d-lg-block d-flex justify-content-center">
              <Logo />
            </div>

            <div className="col-5 text-end">
              {path === "/" && (
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-end">
                  <li className="nav-item">
                    <Link
                      className="nav-link text-white"
                      aria-current="page"
                      to="/languages"
                    >
                      Choose your language
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/login">
                      Login
                    </Link>
                  </li>
                </ul>
              )}

              {auth.isAuthenticated && path !== "/watch" && (
                <ul className="navbar-nav mb-2 mb-lg-0 d-flex justify-content-end align-items-center">
                  {auth.user.planId && (
                    <li className="nav-item me-3">
                      <Search />
                    </li>
                  )}
                  <li className="nav-item me-3">
                    <Link
                      to="/notifications"
                      className="dropdown-item"
                      style={{ marginTop: "0px" }}
                    >
                      <img src={BellIcon} alt="notifications" />
                    </Link>
                  </li>
                  <li
                    className="nav-item"
                    // style={{ marginRight: "25px" }}
                  >
                    <div className="dropdown">
                      <button
                        className="btn dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ border: 0 }}
                      >
                        <figure className="avatar avatar-nav">
                          <img
                            // src={user && user.profilePictureUrl}
                            // alt={user && user.firstName}
                            src={DefaultAvatar}
                            alt="User Avatar"
                            className="rounded-circle"
                          />
                        </figure>
                        {/* <span className='font-weight-bold'>Hello {user && user.firstName} 👋🏾</span> */}
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/profile"
                            // onClick={}
                          >
                            <img src={EditProfileIcon} alt="Edit Profile" />{" "}
                            &nbsp; Edit Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/"
                            onClick={logoutHandler}
                          >
                            <img src={LogoutIcon} alt="Edit Profile" /> &nbsp;
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
