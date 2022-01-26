import React, {useState,useContext,useEffect} from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Textfield from "../components/FormsUI/Textfield";
import Button from "../components/FormsUI/Button";
import { auth } from "../firebase.js";
import { ToastContainer, toast } from "react-toastify";
import theme from "../theme";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert'
import {useHistory} from 'react-router-dom'
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import {AuthContext} from '../components/Authentication/AuthProvider'


const INITIAL_FORM_STATE = {
	email: "",
	password: "",
	confirmPassword: "",
};

const FORM_VALIDATION = Yup.object().shape({
	email: Yup.string()
		.email("please enter a valid email")
		.required("required"),
	password: Yup.string()
		.min(8, "password must be atleast 8 characters long")
		.required("required"),
	confirmPassword: Yup.string().oneOf(
		[Yup.ref("password"), null],
		"Passwords must match"
	),
});

const Signup = () => {

	const {user} = useContext(AuthContext);

	console.log(user)
	const [error, setError] = useState("")
	const [loading,setLoading] =useState(false);

	const history = useHistory();

	const notify = () => toast.success("successfully registered. Redirecting !");

	const handleSubmit = ({ email, password }, onSubmitProps) => {
		console.log(email, password);
		signup(email,password);
		// console.log(onSubmitProps);
		
	};

	async function signup(email,password){
	try {
			setError("")
            setLoading(true)
			await auth.createUserWithEmailAndPassword(email, password).then(() => {
				notify();
				setTimeout(()=>{
					history.push("/addspecies")
				},3000)
			});
			

		} catch (err) {
			console.log(err.message)
			setError(err.message)
		}
		setLoading(false)
	}

	useEffect(() => {
		if(user){
			history.push("/dashboard")
		}
	}, [user,history])


	return (
		<>
			<Container disableGutters maxWidth={false}>
				<Box
					component="main"
					sx={{ flexGrow: 1, p: 3, pt: 4, mt: "15vh" }}
					maxWidth={300}
					m="auto"
					border={1}
					boxShadow={10}
					bgcolor="white"
					borderColor={theme.palette.primary.main}
				>
					<Formik
						initialValues={{ ...INITIAL_FORM_STATE }}
						validationSchema={FORM_VALIDATION}
						onSubmit={(values, onSubmitProps) => {
							handleSubmit(values, onSubmitProps);
						}}
					>
						<Form autoComplete="off">
							<Grid container spacing={4}>
								<Typography
									variant="h3"
									sx={{ pl: 4, pt: 2 }}
									color="primary"
								>
									Sign Up
								</Typography>
								<Grid item xs={12}>
								{error && <Alert severity="error" sx={{mt:-3,mb:1}}>{error}</Alert>}
									<Textfield name="email" label="Email" />
								</Grid>
								<Grid item xs={12}>
									<Textfield
										name="password"
										label="Password"
										type="password"
									/>
								</Grid>
								<Grid item xs={12}>
									<Textfield
										name="confirmPassword"
										label="Confirm Password"
										type="password"
									/>
								</Grid>

								<Grid item xs={12}>
									<Button startIcon={<PersonAddAltRoundedIcon/>} disabled={loading}>Sign Up</Button>
									<Typography
										variant="body2"
										color="text.primary"
										sx={{ float: "right", pt: 2 }}
									>
										Already have an account?{" "}
										<Link
											to="/login"
											style={{ color: "green" }}
										>
											{" "}
											Login.
										</Link>
									</Typography>
									<ToastContainer position="bottom-center" />
								</Grid>
							</Grid>
						</Form>
					</Formik>
					<ToastContainer position="bottom-center"/>
				</Box>
			</Container>
		</>
	);
};

export default Signup;
