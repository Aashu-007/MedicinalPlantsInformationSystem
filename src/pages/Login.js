import React, { useState } from "react";
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
import Alert from "@mui/material/Alert";
import { useHistory } from "react-router-dom";
import LockRoundedIcon from '@mui/icons-material/LockRounded';

const INITIAL_FORM_STATE = {
    email: "",
    password: "",
};

const FORM_VALIDATION = Yup.object().shape({
    email: Yup.string()
        .email("please enter a valid email")
        .required("required"),
    password: Yup.string()
        .min(8, "password must be atleast 8 characters long")
        .required("required"),
});

const Login = () => {
    const [error, setError] = useState("Login/SignUp to add new species");
    const [loading,setLoading] =useState(false);

    const history = useHistory();

    const notify = () => toast.success("Login successful. Redirecting !");

    const handleSubmit = ({email,password}, onSubmitProps) => {
        console.log(email,password);
        login(email,password)
        // console.log(onSubmitProps);
    };

    async function login(email,password){
    try {
            setError("")
            setLoading(true)
            await auth.signInWithEmailAndPassword(email, password).then(() => {
                notify();
                setTimeout(()=>{
                    history.push("/addspecies")
                },2000)
            });

        } catch (err) {
            console.log(err.message)
            setError("email or password invalid.")
        }
        setLoading(false)
    }

    return (
        <>
            <Container disableGutters maxWidth={false}>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, pt: 4, mt: "20vh" }}
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
                                    Login
                                </Typography>
                                <Grid item xs={12}>
                                    {error && (
                                        <Alert
                                            severity="error"
                                            sx={{ mt: -3, mb: 1 }}
                                        >
                                            {error}
                                        </Alert>
                                    )}
                                    <Textfield 
                                        name="email" 
                                        label="Email" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Textfield
                                        name="password"
                                        label="Password"
                                        type="password"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Button startIcon={<LockRoundedIcon/>} disabled={loading}>Login</Button>
                                    <Typography
                                        variant="body2"
                                        color="text.primary"
                                        sx={{ float: "right", pt: 2 }}
                                    >
                                        Don't have an account?{" "}
                                        <Link
                                            to="/signup"
                                            style={{ color: "green" }}
                                        >
                                            {" "}
                                            Sign Up.
                                        </Link>
                                    </Typography>
                                    <ToastContainer position="bottom-center" />
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                </Box>
            </Container>
        </>
    );
};

export default Login;
