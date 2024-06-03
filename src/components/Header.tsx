import React from "react";
import { AppBar, Typography, Fab, Grid, TextField, Popper, Fade, Toolbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function Header() {  
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Typography variant="h4" component="h1" sx={{ p: 2 }}>
          Audio Player for Streamed Content
        </Typography>
      </AppBar>
      <Toolbar />
    </React.Fragment>        
  );
}

// function Header() {
//   const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

//   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchor(anchor ? null : event.currentTarget);
//   };

//   const open = Boolean(anchor);
//   const id = open ? 'simple-popper' : undefined;
  
//   return (
//     <React.Fragment>
//       <AppBar sx={{ p: 2 }} position="fixed">
//         <Toolbar>
//           <Grid container sx={{ display: "flex", alignItems: 'center', }}>
//             <Grid xs={11}>
//               <Typography variant="h4" component="h1" sx={{ p: 2 }}>
//                 Audio Player for Streamed Content
//               </Typography>
//             </Grid>
//             <Grid xs>
//               <Fab color="default" aria-label="add" onClick={handleClick}>
//                 <AddIcon />
//               </Fab> 
//               <Popper id={id} open={open} anchorEl={anchor} placement="bottom-start" disablePortal={true} transition>
//                 {({ TransitionProps }) => (
//                   <Fade {...TransitionProps}>
//                     <TextField id="filled-basic" label="Filled" variant="filled" />
//                   </Fade>
//                 )}
//               </Popper>
//             </Grid> 
//           </Grid>
//         </Toolbar>        
//       </AppBar>
//       <Toolbar />
//     </React.Fragment>        
//   );
// }

export default Header;