import React from 'react'
import { useNavigate } from 'react-router-dom';

import BackArrow from "../icons/backArrow.svg";

const BackButton = () => {
    const navigate = useNavigate();

    const goToPreviousPage = () => {
        navigate(-1); // Navigate back one step in history
    };

  return (
    <div>
          <img src={BackArrow} alt="back" className='mb-5'
            style={{ cursor: 'pointer' }}
            onClick={goToPreviousPage}
            />
    </div>
  )
}

export default BackButton