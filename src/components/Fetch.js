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
import theme from "../theme";
import { Link } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const style = {
	scroll: {
		backgroundColor: theme.palette.primary.main,
		borderRadius: 30,
		right: 15,
		bottom: 15,
	},
};

const GetData = () => {
	const [plantData, setPlantData] = useState([]);

	const [open, setOpen] = useState(false);
	const [modal, setModal] = useState({});

	const onOpenModal = (data) => {
		setModal(data);
		setOpen(true);
	};
	const onCloseModal = () => setOpen(false);

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
									<Grid item xs={12} md={4} sm={6} lg={3}>
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
													<Button
														size="small"
														onClick={() =>
															onOpenModal(data)
														}
													>
														View
													</Button>
													
													<Button size="small">
														<Link
															to={`/plant/${data.id}`}
															style={{
																textDecoration:
																	"inherit",
																color: "inherit",
															}}
														>
															Read More
														</Link>
													</Button>
												</CardActions>
											</CardActionArea>
										</Card>
									</Grid>
								</>
							);
						})}
						{open &&
													setModal != null ? (
														<Modal
															open={open}
															onClose={
																onCloseModal
															}
															center
														>
															<Typography variant="h5" color="secondary">
															{modal.LocalName}
															<Typography variant="subtitle1" color="text.primary">
															<span style={{fontWeight:"bold"}}>Local Name : </span>{modal.LocalName}
															</Typography>
															</Typography>
															<Typography variant="subtitle1" color="text.primary">
															<span style={{fontWeight:"bold"}}>Scientific Name : </span>{modal.ScientificName}
															</Typography>
															<Typography variant="subtitle1" color="text.primary">
															<span style={{fontWeight:"bold"}}>Distribution : </span>{modal.Distribution}
															</Typography>
															<Typography variant="subtitle1" color="text.primary">
															<span style={{fontWeight:"bold"}}>Types : </span>{modal.Types}
															</Typography>
															<Typography variant="subtitle1" color="text.primary">
															<span style={{fontWeight:"bold"}}>Uses/Parts Used : </span>{modal.PartUseandUses}
															</Typography>
															<Typography variant="subtitle1" color="text.primary">
															<span style={{fontWeight:"bold"}}>Location : </span>{modal.Location}
															</Typography>
														</Modal>
													) : (
														""
													)}
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
