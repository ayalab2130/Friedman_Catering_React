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
import { useSelector } from 'react-redux';




export default function UserListSaveTwo() {
  
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  let users= useSelector(state=>state.user.usersArr);
  const messageExamples=[];
//   const [messages, setMessages] = useState(() => refreshMessages());
  

//   function refreshMessages() {
//     const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));
  
//     return users(new Array(50)).map(
//       () => users[getRandomInt(users.length)],
//     );
//   }

  useEffect(() => {
    // ref.current.ownerDocument.body.scrollTop = 0;
    // setMessages(refreshMessages());
  }, []);
  

  return (
    <>
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <List>
        {users.map((user_, index) => (
          <ListItem button key={index}>
            <ListItemAvatar>
              <Avatar alt={user_.userName} src={" "} />
            </ListItemAvatar>
            <ListItemText primary={user_.userName} secondary={user_.email} />
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
    </Box></>
  );
}
// const a=useSelector(state=>state.user.usersArr);

// const  = useSelector(state=>state.user.usersArr);

