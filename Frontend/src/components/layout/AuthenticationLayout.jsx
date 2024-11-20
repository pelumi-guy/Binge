import React from "react";
import PropTypes from "prop-types";

const AuthenticationLayout = ({ children }) => {
  // useEffect(() => {
  //   window.scrollTo(0, 300);
  // }, [])

  return (
    <div className='dark-mode auth-bcg'>
      <div>{children}</div>
    </div>
  );
};
AuthenticationLayout.propTypes = {
  children: PropTypes.object,
};

export default AuthenticationLayout;
