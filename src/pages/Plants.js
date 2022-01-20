import React, { useState, useEffect} from "react";
import firebase from "../firebase";
import { useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import theme from "../theme";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer';


const Plants = () => {

	const [plantData, setPlantData] = useState({});

	const { id } = useParams();

	useEffect(() => {
		const firestore = firebase.database().ref(`/PlantDatabase/${id}`);
		firestore.get().then((snapshot) => {
			if (snapshot.exists()) {
				setPlantData({ ...snapshot.val() });
			} else {
				setPlantData({});
			}
		});
	}, [id]);

	console.log("id", id);
	console.log("data", plantData);
	return (
		<>
			<Container
				style={{ backgroundColor: theme.palette.primary.optional }}
				disableGutters
				maxWidth={false}
			>
				<Box
					component="main"
					sx={{ flexGrow: 1, p: 4, boxShadow: 1, pt: 10 }}
					m="auto"
					maxWidth={800}
					bgcolor="white"
				>
				
				<Typography
                        variant="h2"
                        sx={{ flexGrow: 1 }}
                        color="primary"
                    >
                        {plantData.LocalName}
                    </Typography>
                    <Divider sx={{pt:1}}/>
					<Grid container sx={{py:2}}>
						<Grid item xs={12} sm={6} md={6}>
							<Card
								sx={{
									maxWidth: 300,
									minWidth: 200,
									borderRadius: 5,
								}}
								
							>
									<CardMedia
										component="img"
										alt="plant"
										height="300"
										image={plantData.ImgUrl}
										style={{objectFit:"fill"}}
									/>
							</Card>
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
							<Typography sx={{fontSize: 20,pt:3,pl:2}} variant="subtitle2" color="text.secondary">Local Name : {plantData.LocalName}</Typography>
							<Typography sx={{fontSize: 20,pl:2}} variant="subtitle2" color="text.secondary">Scientific Name : {plantData.ScientificName}</Typography>
							<Typography sx={{fontSize: 20,pl:2}} variant="subtitle2" color="text.secondary">Types : {plantData.Types}</Typography>
							<Typography sx={{fontSize: 20,pl:2}} variant="subtitle2" color="text.secondary">Distribution : {plantData.Distribution}</Typography>
							<Typography sx={{fontSize: 20,pl:2}} variant="subtitle2" color="text.secondary">Parts Used and Uses : {plantData.PartUseandUses}</Typography>
							<Typography sx={{fontSize: 20,pl:2}} variant="subtitle2" color="text.secondary">Location : {plantData.Location}</Typography>
						</Grid>
						<Grid xs={12}>
							<Typography sx={{pt:2,textAlign:'justify'}} variant="body1">{plantData.Description}</Typography>
						</Grid>
						<Button variant="contained" color="success" onClick="">Download as PDF</Button>
					</Grid>
					
				</Box>
			</Container>
		</>
	);
};

export default Plants;
