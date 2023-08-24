import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { useEffect, useState,useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {AiOutlineCloseCircle} from "react-icons/ai";
import { fetchAllUsers } from "./userSlice";
import { textAlign } from '@mui/system';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function UserList() {
  
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  let users= useSelector(state=>state.user.usersArr);
  let statusUsersArr= useSelector(state=>state.user.statusUsersArr);
  let disp=useDispatch();


  useEffect(() => {
    if(statusUsersArr==="idle"){
    disp(fetchAllUsers()) } 
  }, []);
  const [open, setOpen] = React.useState(false);  
  const [dialogeUser, setDialogeUser] = React.useState(null);
  

  const handleClickOpen = (u) => {
    setOpen(true);
    setDialogeUser(u);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
    setDialogeUser(null);
  };
  

  return (
    <>
    <Box sx={{ pb: 7 }} ref={ref} >
      {/* <CssBaseline dir='rtl' /> */}
      <List>
        {users.map((user_, index) => (
          <ListItem button key={index} onClick={()=>{handleClickOpen(user_)}} dir="rtl" style={{textAlign:"initial"}}  >
            <ListItemAvatar >
              <Avatar alt={user_.userName} src={" "} />
            </ListItemAvatar>
            <ListItemText primary={user_.userName} secondary={user_.email}  />
            {/* <Button variant="outlined" onClick={handleClickOpen}> */}
        {/* לפרטים נוספים
      </Button> */}
      
          </ListItem>
        ))}
      </List>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
        //   onChange={(event, newValue) => {
        //     setValue(newValue);
        //   }}
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
    {dialogeUser&&
    <Dialog
    sx={{minWidth:"450px" }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        dir='rtl'
      >
        <DialogTitle>{"שם משתמש: "+dialogeUser.userName}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            מייל:{dialogeUser.email}<br/>
            {/* כתובת:{user_.addresss} */}
            עיר:{ dialogeUser.addresss.city} <br></br>
            רחוב:  { dialogeUser.addresss.street }<br></br>
            מספר בית: { dialogeUser.addresss.home }<br></br>
          </DialogContentText>
        </DialogContent>
        <DialogActions> 
          <AiOutlineCloseCircle fontSize="meduim" onClick={(e)=>{handleClose(e)}}></AiOutlineCloseCircle>
        </DialogActions>
      </Dialog>}
    </>
  );
}
// const a=useSelector(state=>state.user.usersArr);

// const  = useSelector(state=>state.user.usersArr);

