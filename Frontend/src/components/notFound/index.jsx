import React from 'react';
import "./notfound.scss";
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  // Arrays for star and bird elements
  const star1Array = Array.from({ length: 30 });
  // const star2Array = Array.from({ length: 30 });
  const birdArray = Array.from({ length: 6 });

  const numStars = 500;
  const starObjs = [];

  for (let i = 0; i < numStars; i++) {
    const star = {}
    const xy = getRandomPosition();
    star.top = xy[0] + 'px';
    star.left = xy[1] + 'px';
    star.key = i;
    starObjs.push(star);
  }

  // Gets random x, y values based on the size of the container
  function getRandomPosition() {
    var y = window.innerWidth;
    var x = window.innerHeight;
    var randomX = Math.floor(Math.random() * x);
    var randomY = Math.floor(Math.random() * y);
    return [randomX, randomY];
  }

  const goToPreviousPage = () => {
    navigate(-1); // Navigate back one step in history
  };

  return (
    <div>
      {/* Render star-1 elements */}
      <div className="notfound-container container-star">
        {star1Array.map((_, index) => (
          <div key={index} className="star-1"></div>
        ))}
      </div>

      {starObjs.map((star) => <div className="star-2" key={star.key}
        style={{ top: star.top, left: star.left }}></div>)}

      {/* Render star-2 elements */}
      {/* <div className="notfound-container container-star show-border">
        {star2Array.map((_, index) => (
          <div key={index} className="star-2"></div>
        ))}
      </div> */}

      {/* Render bird elements */}
      <div className="notfound-container container-bird">
        {birdArray.map((_, index) => (
          <div key={index} className="bird bird-anim">
            <div className="bird-container">
              <div className="wing wing-left">
                <div className="wing-left-top"></div>
              </div>
              <div className="wing wing-right">
                <div className="wing-right-top"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Render title and button */}
      <div className="container-title">
        <div className="title">
          <div className="number">4</div>
          <div className="moon">
            <div className="face">
              <div className="mouth"></div>
              <div className="eyes">
                <div className="eye-left"></div>
                <div className="eye-right"></div>
              </div>
            </div>
          </div>
          <div className="number">4</div>
        </div>
        <div className="subtitle">Oops. Looks like you took a wrong turn.</div>
        <button className='my-3 btn fw-bold back-btn'
          style={{ color: "#9B51E0" }}
          onClick={goToPreviousPage}
        >Go back</button>
      </div>
    </div>
  );
}

export default NotFound