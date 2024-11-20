// // //first trial

// import React, { useState, useRef } from "react";
// import Avatar from "react-avatar-edit";
// import { Dialog } from "primereact/dialog";
// import { Button } from "primereact/button";
// import { InputText } from "primereact/inputtext";
// import img from "../assets/images/userprofile/avatarP2.jpg";

// function ProfileUpload() {
//   const [image, setImage] = useState("");
//   const [imageCrop, setImageCrop] = useState(false);
//   const [src, setSrc] = useState(false);
//   const [profile, setProfile] = useState([]);
//   const [profileView, setProfileView] = useState(false);

//   const profileFinal = profile.map((item) => item.profileView);

//   const onClose = () => {
//     setProfileView(null);
//   };
//   const onCrop = (view) => {
//     setProfileView(view);
//   };
//   const saveCropImage = () => {
//     setProfile([...profile, { profileView }]);
//     setImageCrop(false);
//   };
//   return (
//     <div className="bg-none">
//       <div className="profile_image text-center p-4">
//         <div className="flex flex-column justify-content-center align-items-center">
//           <img
//             style={{
//               width: "200px",
//               height: "200px",
//               borderRadius: "50%",
//               objectFit: "cover",

//             }}
//             onClick={() => setImageCrop(true)}
//             src={profileFinal.length ? profileFinal : img}
//             alt="Profile Image"
//           />
//           <Dialog
//             visible={imageCrop}
//             header={() => (
//               <p className="text-2xl font-semibold textColor">
//                 {" "}
//                 Update Profile
//               </p>
//             )}
//             onHide={() => setImageCrop(false)}
//           >
//           <div className="confirmation-content flex flex-column align-items-center">
//             <Avatar
//             width={500}
//             height={400}
//             onCrop={onCrop}
//             onClose={onClose}
//             src={src}
//             shadingColor={"#474649"}
//               backgroundColor={"#474649"}
//             />
//             <div className="flex flex-column align-items-center mt-5 w-12">
//                 <div className="flex justify-content-around w-12 mt-4">
//                     <Button
//                     onClick={saveCropImage}
//                     label="Save"
//                     icon = "pi pi-check"
//                     />
//                 </div>
//             </div>
//           </div>
//           </Dialog>
//           <InputText
//           type="file"
//           accept="image/*"
//           style={{display: "none"}}
//           onChange={(event) => {
//             const file = event.target.files[0];
//             if(file && file.type.substring(0, 5) === "image"){
//                 setImage(file);
//             }else{
//                 setImage(null);
//             }
//           }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
// export default ProfileUpload;


// // //second trial not applicable, has cloudinary code

// // // import React from "react";
// // // import axios from "axios";
// // // import { Image } from "cloudinary-react";
// // // // import { useState } from "react";

// // // function ProfileUpload() {
// // //   //   const [selectedImage, setSelectedImage] = useState("");

// // //   const uploadImage = (files) => {
// // //     const formData = new FormData();
// // //     formData.append("file", files[0]);
// // //     formData.append("upload_preset", "rkvnergr");
// // //     axios
// // //       .post("https://api.cloudinary.com/v1_1/dh20o5pnj/image/upload", formData)
// // //       .then((response) => {
// // //         console.log(response);
// // //       });
// // //   };

// // //   return (
// // //     <div
// // //       className=""
// // //       style={{
// // //         display: "flex",
// // //         justifyContent: "center",
// // //         alignItems: "center",
// // //         height: "100vh",
// // //       }}
// // //     >
// // //       <input
// // //         type="file"
// // //         className="picture"
// // //         onChange={(e) => {
// // //           //   setSelectedImage(e.target.files[0]);
// // //           uploadImage(e.target.files);
// // //         }}
// // //       />
// // //       {/* <button onClick={uploadImage}>Upload</button> */}

// // //       <Image
// // //          style ={{width: "200px", borderRadius:"100%" }}
// // //         cloudName="dh20o5pnj"
// // //         publicId="https://res.cloudinary.com/dh20o5pnj/image/upload/v1709404522/jywwwmkqsl26y06qidya.jpg"

// // //       />
// // //       </div>

// // //   );
// // // }

// // // export default ProfileUpload;