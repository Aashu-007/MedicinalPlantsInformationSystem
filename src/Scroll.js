import React from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
  toTop: {
    zIndex: 0,
    position: "fixed",
    bottom: "2vh",
    right: "5%"
  },
}));


const Scroll = ({showBelow}) => {
  const classes = useStyles();

  const [show, setShow] = useState(showBelow ? false : true);

  const handleScroll = () => {
    if (window.pageYOffset > showBelow) {
      if (!show) setShow(true);
    } else {
      if (show) setShow(false);
    }
  };

 const handleClick = () => {
    window[`scrollTo`]({ top: 0, behavior: `smooth` });
  };

  useEffect(() => {
    if (showBelow) {
      window.addEventListener(`scroll`, handleScroll);
      return () => window.removeEventListener(`scroll`, handleScroll);
    }
  });



  return (
      <div>
        {show && (
          <IconButton onClick={handleClick}  className={classes.toTop}>
            <Fab color="primary" size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </IconButton>
        )}
      </div>
  );
};
export default Scroll;
