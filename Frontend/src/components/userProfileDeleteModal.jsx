import React, {useContext, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {styled} from '@mui/material/styles';
import { deleteUser } from '../network/library/user/userprofile-integration';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close' 
import AuthContext from '../context/AuthProvider';


const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root' : {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root' : {
        padding: theme.spacing(2)
    },
}));


export default function AlertDialog() {
  const [open, setOpen] = useState(true);
  const [error, setError] = useState("");

  const {auth, setAuth} = useContext(AuthContext);
  const userEmail = localStorage.getItem("email");

const navigate = useNavigate()

const handleDelete = async () => {

    try{
      const response = await deleteUser(userEmail);

      if(response.data.succeeded){
        localStorage.clear();
        setAuth({isAuthenticated: false});
        toast.success("Profile Deleted Successfully");
        navigate('/')
      }
      else {
        setError(response.data.message)
        console.log({error})
      }
    }
    catch(error){
        if(error.response)
        {
            setError(error.response.data.message)
            console.log({error})

        }
        else{
            setError("No server response")
        }

    }

  }

  const handleClose = () => {
    setOpen(false);
    navigate('/profile')

  };

  return (
    <div className='deleteUser-screen'>
      <BootstrapDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{m:0, p: 2, textAlign:'center'}} id="alert-dialog-title">
          <h4>Confirmation required</h4>
        </DialogTitle>
        <IconButton 
        aria-label ="close"
        onClick={handleClose}
        sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
        }}
        >
            <CloseIcon />
        </IconButton>
        {error && (
                <div className='col-md-12 text-danger d-flex justify-content-center' >
                    {error}
                </div>
            )}
        <DialogContent sx={{textAlign:'center'}}>
            
          <DialogContentText id="alert-dialog-description">
            <h4>Are you sure you want to delete profile?</h4>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{color:"red"}} onClick={handleDelete}>Yes</Button>
          <Button onClick={handleClose} autoFocus >
            No
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}