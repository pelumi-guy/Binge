import React from "react";
import "../assets/styles/userProfile.css";
import close from "../assets/images/userprofile/lock.svg";
import open from "../assets/images/userprofile/unlock.svg";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import dropdown from '../assets/images/userprofile/dropdownarrow.svg'
import 'primeicons/primeicons.css';
import '../assets/images/userprofile/selectIcon.svg'
import PImg from '../assets/images/userprofile/PImage.png'
import 'primeicons/primeicons.css'
import { ToastContainer, toast } from "react-toastify";
import {updateUser } from "../network/library/user/userprofile-integration";
import BackButton from "../assets/reusable_components/BackButton";
        

function Profile() {

  const userfirstName = localStorage.getItem("firstName");
  const userEmail = localStorage.getItem("email");

  const [firstName, setFirstName] = useState(userfirstName);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState("");

  const handleClick = () => {
    const write = document.getElementById("name_field");
    const photo = document.getElementById("image_detail");
    if (write.disabled === true) {
      write.disabled = false;
      photo.src = open;
    } else {
      write.disabled = true;
      photo.src = close;
    }
  };

  const navigate = useNavigate();
  const handleNameBlur = () => {
    handleClick();
  };

  const handleName = (event) => {
    setFirstName(event.target.value);
    console.log(firstName);
  };

  
  
  const handleSave = async () => {
    if(firstName === userfirstName)
    {
      return;
    }
    setLoading(true);
    try{
      
        if(firstName === "")
        {
          setError("Enter a name");
          setLoading(false);
          return;
        }
        const response = await updateUser({email:userEmail, firstName:firstName})
        console.log(response);

        if (response.data.succeeded){
          setFirstName(response.data.data.firstName)
          localStorage.setItem('firstName',response.data.data.firstName)
          toast.success("Name successfully changed")
        }
        else {
          setError(response.data.message)
          console.log({error})
        }
    }
    catch (error){
      if(error.response){
        setError(error.response.data.message)
      } else{
        setError("No server response")
        setFirstName(userfirstName)
      }

    }
    finally{
      setLoading(false)
      
    }
    
  };

  
  const deleteButton = () =>{
    navigate('/deletemodal')

   };
  
  
  const handleIconClick = () => {
    
  }

  return (
    <div className="profile">
      <span className="back-arrow">
      <BackButton />
      </span>
        {/* <div className="profile-content"> */}
      <div className="user">
        <h1 style={{textAlign:'center'}}>Edit Your Profile</h1>
        <p>Manage your Binge account</p>
        <div className="image_holder">
        <div className="profile_picture">
          <img
          src= {PImg}
          alt="Select"
          style={{width:'100px', height:'100px', borderRadius:'100px', border:'none'}}

          />
          {/* <div className="icon-div">
          <i className="pi pi-image profileImage_icon" style={{fontSize:'1rem', color: 'rgba(39, 174, 96, 1)'}}  onClick={handleIconClick}></i>
          </div> */}
        </div>
        </div>
        
        <div className="profile-details">
          <form className="form">
            <div className="entry-1">
              <label htmlFor="name_field">Change Name</label>
              <input
                type="text"
                id="name_field"
                placeholder="Name"
                disabled
                value={firstName}
                onChange={handleName}
                onBlur={handleNameBlur}
              />
              <img
                src={close}
                id="image_detail"
                alt="icon"
                onClick={handleClick}
              />
            </div>
            <div className="entry-2">
              <label htmlFor="language_field">Choose Preferred Language</label>
              <input
                type="text"
                id="language_field"
                disabled
                value="English"
              />
              <img
                src={dropdown}
                id="languageImage_detail"
                alt="icon"
              />
            </div>
            <div className="entry-3">
              <label htmlFor="email_field">Email Address</label>
              <input
                type="email"
                id="email_field"
                placeholder="Email"
                value={userEmail}
                disabled
              />
              <img
                src={close}
                id="image3_detail"
                alt="icon"
              />
            </div>
          </form>
        </div>
        <div className="profile-end">
          {error && (
            <div className="col-md-12 mb-3" style={{textAlign:'center', color:'red'}} >
              {error}
            </div>
          )}
          {loading && (
            <div className="col-md-12 mb-3" style={{textAlign:'center', color:'rgba(155, 81, 224, 1'}}>
              <i className="pi pi-spin pi-spinner" style={{fontSize:'2.5rem'}}></i>
               </div>
          )}
          <button className="save" onClick={handleSave}>
            Save
          </button>
          <button className="delete" onClick={deleteButton}>Delete Profile</button>
        </div>
      </div>
      </div>
    // </div>
  );
}

export default Profile;
