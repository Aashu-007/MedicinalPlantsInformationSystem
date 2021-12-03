import React from "react";
import firebase from "./firebase";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const GetData = () => {
	const [plantData, setPlantData] = useState([]);

	useEffect(() => {
		const firestore = firebase.database().ref("/PlantDatabase");
		firestore.on("value", (response) => {
			const data = response.val();
			let PlantsInfo = [];
			for (let id in data) {
				PlantsInfo.push({
					id: id,
					ImgUrl: data[id].ImgUrl,
					LocalName: data[id].LocalName,
					ScientificName: data[id].ScientificName,
					Distribution: data[id].Distribution,
					PartUseandUses: data[id].PartUseandUses,
					Types: data[id].Types,
				});
			}
			setPlantData(PlantsInfo);
		});
	}, []);

	return (
		<div>
			<p>
				<Grid container spacing={4}>
					{plantData.map((data, index) => {
						return (
							<>
								<Grid item xs={12} md={3} sm={6}>
									<Card
										sx={{ maxWidth: 275, minWidth: 150 }}
										raised="true"
									>
										<CardActionArea>
											<CardMedia
												component="img"
												alt="plant"
												height="180"
												image={data.ImgUrl}
											/>
											<CardContent>
												<Typography
													gutterBottom
													variant="h6"
													component="div"
												>
													{data.LocalName}
												</Typography>
												<Typography
													variant="body2"
													color="text.secondary"
												>
													{data.Types}
												</Typography>
											</CardContent>
											<CardActions>
												<Button size="small">
													View
												</Button>
												<Button size="small">
													Learn More
												</Button>
											</CardActions>
										</CardActionArea>
									</Card>
								</Grid>
							</>
						);
					})}
				</Grid>
			</p>
		</div>
	);
};

export default GetData;
