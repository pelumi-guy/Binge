// import React, { useEffect, useState } from "react";
// import axios from "axios";
import fav1 from '../../assets/images/landing/favorite1.svg'


function FavouriteFilms() {
   //   const [favourites, setFavourites] = useState([]);

   //   useEffect(() => {
   //     axios
   //       .get("http://jsonplaceholder.typicode.com/users")
   //       .then((res) => {
   //         setFavourites(res.data.slice(0, 3));
   //       })
   //       .catch((err) => console.log(err));
   //   }, []);

   return (
      //     <div className="d-flex">
      //       {/* <ul className="d-flex"> */}
      //       {favourites.map((film, index) => (
      //         <div key={index} className="me-4">
      //           {film.id} {film.name}
      //         </div>
      //       ))}
      //       {/* </ul> */}
      //     </div>
      <div className="col-4 show-border">
         <img
            src={fav1}
            alt="Favorite"
            // className="img-fluid"
            style={{ width: '100%' }}
         />
      </div>
   );


}

export default FavouriteFilms;
