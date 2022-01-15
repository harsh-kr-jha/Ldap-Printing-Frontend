import { Typography } from '@mui/material'
import React from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    footer: {
 
      padding: "6px",
      marginTop: "50px",
    },
  });


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Developed by "}
     
        ITC with ❤️
     
      
   
    </Typography>
  );
}

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
         <Copyright />
      <Typography variant="body2" color="primary" align="center" gutterBottom>
        {/* An intitative by STF(Student Task Force) IITB */}
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      ></Typography>
     
    </footer>
  );
};

export default Footer;