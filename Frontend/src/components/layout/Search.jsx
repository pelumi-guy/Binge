import React, { useState } from 'react';
import { useNavigate } from 'react-router';
// import SearchIcon from "../../assets/images/homePage/SearchIcon.svg"


const Search = () => {
    const navigate = useNavigate();

    const [keyword, setKeyword] = useState('');

    const searchHandler = () => {
        // console.log("Searching...");

        if (keyword) {
            navigate(`/search/${keyword}`);
        }

    };

    return (
        <form
            onSubmit={searchHandler}
        >
            <div className="input-group search-container">
                {/* <div className="input-group-append py-0">
                    <button id="search_btn" className="btn search-btn border" style={{ borderRight: "0px" }}>
                        <img src={SearchIcon} alt="search" />
                    </button>
                </div> */}
                <input
                    type="text"
                    id="search_field"
                    className="form-control search-box"
                    placeholder="Title, People, Genre"
                    onChange={(e) => setKeyword(e.target.value)}
                />

            </div>
        </form>
    )
}

export default Search