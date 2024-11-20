import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';


const PrimaryLayout = ({ children }) => {
  return (
    <div className='dark-mode'>
      <Header />
      <div className='mb-3'>
        {children}
      </div>
      <Footer />
    </div>
  )
}

PrimaryLayout.propTypes = {
  children: PropTypes.object
};

export default PrimaryLayout;