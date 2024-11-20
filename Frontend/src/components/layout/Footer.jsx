import React, { Fragment } from 'react';
import "./assets/styles/layout.css";
import Logo from './Logo';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart } from '@fortawesome/free-regular-svg-icons';
// import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import Twitter from './assets/icons/Twitter';
import LinkedIn from './assets/icons/LinkedIn';
import Facebook from './assets/icons/Facebook';
import Github from './assets/icons/Github';
import PeaceSign from './assets/icons/PeaceSign';
import BasketBall from './assets/icons/BasketBall';


const Footer = () => {
  const socialIcons = [
    Twitter,
    LinkedIn,
    Facebook,
    Github,
    PeaceSign,
    BasketBall
  ]

  return (
    <footer className="footer text-white">

      <div className="container-fluid row px-4">

        <div className="col-12 col-md-3">
          <Logo />
          <p className='text-white'>
            Design amazing digital experiences that create more happy in the world.
          </p>
        </div>

        <div className="col-12 col-md-9 row">
          <div className="d-none d-md-block col-md-2"></div>
          <div className="col-12 col-md-2 mt-2 mt-md-0">
            <div className="footer-col">
              <div className="footer-header mb-3">
                Product</div>
              <div className="footer-item mb-2">
                Overview</div>
              <div className="footer-item mb-2">
                Features</div>
              <div className="footer-item mb-2">
                Solutions</div>
              <div className="footer-item mb-2">
                Tutorials</div>
              <div className="footer-item mb-2">
                Pricing</div>
              <div className="footer-item mb-2">
                Releases</div>
            </div>
          </div>

          <div className="col-12 col-md-2 mt-2 mt-md-0">
            <div className="footer-col">
              <div className="footer-header mb-3">
                Company</div>
              <div className="footer-item mb-2">
                About Us</div>
              <div className="footer-item mb-2">
                Careers</div>
              <div className="footer-item mb-2">
                Press</div>
              <div className="footer-item mb-2">
                News</div>
              <div className="footer-item mb-2">
                Media kit</div>
              <div className="footer-item mb-2">
                Contact</div>
            </div>
          </div>

          <div className="col-12 col-md-2 mt-2 mt-md-0">
            <div className="footer-col">
              <div className="footer-header mb-3">
                Resources</div>
              <div className="footer-item mb-2">
                Blog</div>
              <div className="footer-item mb-2">
                Newsletter</div>
              <div className="footer-item mb-2">
                Events</div>
              <div className="footer-item mb-2">
                Help centre</div>
              <div className="footer-item mb-2">
                Tutorials</div>
              <div className="footer-item mb-2">
                Support</div>
            </div>
          </div>

          <div className="col-12 col-md-2 mt-2 mt-md-0">
            <div className="footer-col">
              <div className="footer-header mb-3">
                Social</div>
              <div className="footer-item mb-2">
                Twitter</div>
              <div className="footer-item mb-2">
                LinkedIn</div>
              <div className="footer-item mb-2">
                Facebook</div>
              <div className="footer-item mb-2">
                Github</div>
              <div className="footer-item mb-2">
                AngelList</div>
              <div className="footer-item mb-2">
                Dribble</div>
            </div>
          </div>

          <div className="col-12 col-md-2 mt-2 mt-md-0">
            <div className="footer-col">
              <div className="footer-header mb-3">
                Legal</div>
              <div className="footer-item mb-2">
                Terms</div>
              <div className="footer-item mb-2">
                Privacy</div>
              <div className="footer-item mb-2">
                Cookies</div>
              <div className="footer-item mb-2">
                Licenses</div>
              <div className="footer-item mb-2">
                Settings</div>
              <div className="footer-item mb-2">
                Contact</div>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-5 copyright container-fluid d-flex justify-content-between">
        <div className="px-5">
          © 2023 Binge. All rights reserved.
        </div>

        <div className="social-icons">
          {
            socialIcons.map((Icon, idx) => {
              return (<Fragment key={idx}><Icon /> &nbsp; &nbsp;</Fragment>);
            })
          }
        </div>
      </div>

    </footer>
  )
}

export default Footer;