import React, { useState , useEffect} from "react";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import MailIcon from "@mui/icons-material/Mail";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { makeStyles } from "@mui/styles";
import {
  SwipeableDrawer as MUIDrawer,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import green from "@mui/material/colors/green";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation , useHistory} from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

import "../App.css";

const useStyles = makeStyles({
  drawer: {
    position: "absolute",
    width: "220px",
    height: "100%",
    backgroundColor: green[900],
    color: "white",
  },
});

const Drawer = () => {
  const classes = useStyles();
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const [activeTab, setActiveTab] = useState("Home");

  const location = useLocation();

 

  useEffect(() => {
    if(location.pathname === "/"){
      setActiveTab("Home")
    }else if(location.pathname === "/addspecies"){
      setActiveTab("Add New Species")
    }else if(location.pathname === "/contact"){
      setActiveTab("Contact Us")
    }else if(location.pathname === "/about"){
      setActiveTab("About")
    }
  }, [location])

  const handleMenuClick = () => {
    setOpen(true);
  };

  const itemsList = [
    {
      text: "Home",
      icon: <HomeIcon style={{ color: green[50] }} />,
      path: "/",
    },
    {
      text: "Add New Species",
      icon: <AddBoxIcon style={{ color: green[50] }} />,
      path: "/addspecies",
    },
    {
      text: "Contact Us",
      icon: <MailIcon style={{ color: green[50] }} />,
      path: "/contact",
    },
    {
      text: "About",
      icon: <InfoIcon style={{ color: green[50] }} />,
      path: "/about",
    },
  ];

    const history = useHistory();

   const handleSubmitSearch = (e) => {
    e.preventDefault();
    history.push(`/search?query=${search}`)
    setSearch("")
  }

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
    display: "none",
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '30ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));



  return (
    <>
      {/*<Box sx={{ flexGrow: 1 }}>*/}
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => handleMenuClick()}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" }, ml: -1 }}
          >
            Medicinal & Aromatic Plants of Sikkim
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "block", sm: "none" }, ml: -1 }}
          >
            MPIS Sikkim
          </Typography>
          {activeTab === "Home" ? (
            <form onSubmit={handleSubmitSearch}>
              <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
            autoFocus
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search'}}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </Search>
            </form>
            ):("")}
          
        </Toolbar>
      </AppBar>
      <MUIDrawer
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        variant="temporary"
        color="primary"
      >
        <List className={classes.drawer}>
          <Box sx={{ flexGrow: 1, mt: -1 }}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/mpis-mini.appspot.com/o/logo.jpg?alt=media&token=440f55c2-31f1-43ce-b383-9adaf679dcee"
              alt="mpis sikkim logo"
              width="100%"
              height="100%"
            />
          </Box>
          <Divider variant="middle" />
          {itemsList.map((item, index) => {
            const { text, icon, path } = item;
            return (
              <Link
                to={path}
                style={{ textDecoration: "inherit", color: "inherit" }}
                onClick={() => setOpen(false)}
              >
                <p
                  className={`${activeTab === text ? "active" : ""}`}
                  onClick={() => setActiveTab(text)}
                >
                  <ListItem button key={text}>
                    {icon && <ListItemIcon>{icon}</ListItemIcon>}
                    <ListItemText primary={text} />
                  </ListItem>
                </p>
              </Link>
            );
          })}
        </List>
      </MUIDrawer>
    </>
  );
};

export default Drawer;
