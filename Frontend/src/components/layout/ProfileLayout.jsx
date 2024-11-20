import React from "react";
import PropTypes from "prop-types";
// import Header from './Header';
// import Footer from './Footer';

const ProfileLayout = ({ children }) => {
  return (
    <div className="">
      {/* <Header /> */}
      <div className="">{children}</div>
      {/* <Footer /> */}
    </div>
  );
};

ProfileLayout.propTypes = {
  children: PropTypes.object,
};

export default ProfileLayout;
