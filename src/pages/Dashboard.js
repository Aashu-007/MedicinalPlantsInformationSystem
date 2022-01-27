import React,{useContext} from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {AuthContext} from '../components/Authentication/AuthProvider'
import Searchbar from '../components/Searchbar'
import DataSearch from '../DataSearch.json'

const Dashboard = () => {
	const {logout,user} = useContext(AuthContext);

	return (
		<div>
			<br />
			<br />
			<br /> <br /> <br />
			<Typography variant="h4" color="primary">
			Hello {user && user.email}
			{user && console.log(user.email)}
			</Typography>
			<br/> <br/>
			<Searchbar data={DataSearch} placeholder="Search" />
			<br/> <br/>
			<Button variant="contained"
				
			>
				console
			</Button>
			<Button variant="contained"
				onClick={logout}
			>
				Logout
			</Button>
		</div>
	);
};

export default Dashboard;
