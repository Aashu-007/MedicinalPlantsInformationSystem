import React from 'react';
import firebase from './firebase';
import {useEffect,useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const GetData = () => {

	const [plantData, setPlantData] = useState([]);

	useEffect(() => {
		const firestore=firebase.database().ref("/PlantDatabase");
		firestore.on('value',(response)=>{
			const data = response.val();
			let PlantsInfo = [];
			for(let id in data){
				PlantsInfo.push({
					id:id,
					LocalName:data[id].LocalName,
					ScientificName:data[id].ScientificName,
					Distribution:data[id].Distribution,
					PartUseandUses:data[id].PartUseandUses,
					Types: data[id].Types,
				});
			}
			setPlantData(PlantsInfo);
		})
	}, []);

	return (
		<div className="float">
		<p>Data fetched : 

		{
			plantData.map((data,index)=>{
				return <><br/>
				<Card sx={{ maxWidth: 300 }}>
					<CardMedia
        			component="img"
        			alt="plant"
        			height="140"
        			image="/static/images/cards/contemplative-reptile.jpg"
      			/>
					<CardContent>
        				<Typography gutterBottom variant="h5" component="div">
          				{data.LocalName}
       					</Typography>
        				<Typography variant="body2" color="text.secondary">
          				{data.PartUseandUses}
        				</Typography>
      				</CardContent>
      				<CardActions>
        				<Button size="small">View</Button>
        				<Button size="small">Learn More</Button>
      				</CardActions>
				</Card>
				</>
			})
		}
		</p>
		</div>
);}

export default GetData;