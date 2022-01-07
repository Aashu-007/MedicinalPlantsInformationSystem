import React from "react";
import firebase from "../firebase.js";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ScrollToTop from "react-scroll-to-top";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import green from "@mui/material/colors/green";

const style = {
	scroll: {
		backgroundColor: green[700],
		borderRadius: 30,
		right: 15,
		bottom: 15,
	},
};

const GetData = () => {
	const [plantData, setPlantData] = useState([]);
	const [Transition, setTransition] = useState(true);

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
					Location: data[id].Location,
				});
			}
			setPlantData(PlantsInfo);
		});
	}, []);

	return (
		<>
			<Container disableGutters maxWidth={false} sx={{ p: 5 }}>
				<Box component="main" sx={{ flexGrow: 1, p: 3, mt: 3 }}>
					<Grid container spacing={4}>
						{plantData.map((data, index) => {
							return (
								<>
									<Grid item xs={12} md={3} sm={6}>
										<Card
											sx={{
												maxWidth: 275,
												minWidth: 150,
											}}
											raised
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
														<LocationOnRoundedIcon
															color="primary"
															fontSize="small"
															sx={{
																paddingTop:
																	"4px",
															}}
														/>
														{data.Location}
													</Typography>
												</CardContent>
												<CardActions>
													<Button size="small">
														View
													</Button>
													{/*	<Modal
															visible={
																modal2Visible
															}
															onCancel={
																handleCancel
															}
															onOk={handleOk}
														/>*/}
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
				</Box>
			</Container>

			<ScrollToTop
				smooth
				style={style.scroll}
				component=<KeyboardArrowUpIcon style={{ color: "white" }} />
			/>
		</>
	);
};

export default GetData;
