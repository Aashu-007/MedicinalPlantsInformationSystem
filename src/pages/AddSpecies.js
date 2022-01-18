import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Textfield from "../components/FormsUI/Textfield";
import Button from "../components/FormsUI/Button";
import firebase from "../firebase.js";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import theme from '../theme';
import Divider from "@mui/material/Divider";

const INITIAL_FORM_STATE = {
    ImgUrl: "",
    LocalName: "",
    ScientificName: "",
    Distribution: "",
    PartUseandUses: "",
    Types: "",
    Location: "",
    Description: "",
};

const FORM_VALIDATION = Yup.object().shape({
    ImgUrl: Yup.string().required("required"),
    LocalName: Yup.string().min(3, "Too Short!").required("required"),
    ScientificName: Yup.string().min(3, "Too Short!").required("required"),
    Distribution: Yup.string().min(5, "Too Short!").required("required"),
    PartUseandUses: Yup.string().min(5, "Too Short!").required("required"),
    Types: Yup.string().min(3, "Too Short!").required("required"),
    Location: Yup.string().min(4, "Too Short!").required("required"),
    Description: Yup.string()
        .min(5000, "Should be of minimum 1000 words")
        .required("required"),
});

const notify = () => toast.success("Successfully added!");

const handleAddPlant = (values, onSubmitProps) => {
    const firestore = firebase.database().ref("/PlantDatabase");
    firestore.push(values);
    console.log("Form data", values);
    console.log("Submit props", onSubmitProps);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
    // window.location.reload();
    notify();
};



const AddSpecies = () => {

    return (
        <>
            <Container
                style={{ backgroundColor: theme.palette.primary.optional }}
                disableGutters
                maxWidth={false}
            >
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 2, boxShadow: 1, pt: 8 }}
                    maxWidth={800}
                    m="auto"
                    bgcolor="white"
                >
                    <Typography
                        variant="h2"
                        sx={{ flexGrow: 1 }}
                        color="primary"
                    >
                        Add New Species
                    </Typography>
                    <Divider sx={{pt:1}}/>
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{
                            py: 2,
                            flexGrow: 1,
                            display: { xs: "none", sm: "block" },
                        }}
                    >
                        Discovered a new species?Add them below<span>😉</span>
                    </Typography>
                    <Typography
                        variant="h6"
                        color="primary"
                        sx={{
                            pb: 2,
                            flexGrow: 1,
                            display: { xs: "block", sm: "none" },
                        }}
                    >
                        Discovered a new species?Add them below<span>😉</span>
                    </Typography>
                    <Formik
                        initialValues={{ ...INITIAL_FORM_STATE }}
                        validationSchema={FORM_VALIDATION}
                        onSubmit={(values, onSubmitProps) => {
                            handleAddPlant(values, onSubmitProps);
                        }}
                    >
                        <Form autoComplete="off">
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Textfield
                                        name="ImgUrl"
                                        label="Image URL"
                                        placeholder="The link to the image of the plant"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Textfield
                                        name="LocalName"
                                        label="Local Name"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Textfield
                                        name="ScientificName"
                                        label="Scientific Name"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Textfield
                                        name="Distribution"
                                        label="Distribution"
                                        placeholder="eg. Lower hill, 900-4000ft"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Textfield
                                        name="PartUseandUses"
                                        label="Uses & Parts Used"
                                        placeholder="eg. roots, leaves, flower etc."
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Textfield
                                        name="Types"
                                        label="Types"
                                        placeholder="eg. Herbs,Trees etc."
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Textfield
                                        name="Location"
                                        fullWidth
                                        label="Location"
                                        placeholder="eg. North, South, East, West"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Textfield
                                        name="Description"
                                        fullWidth
                                        placeholder="Enter the Description here in 1000-1500 words."
                                        multiline
                                        rows={6}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button>Add</Button>
                                    <ToastContainer position="bottom-center"/>
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                </Box>
            </Container>
        </>
    );
};

export default AddSpecies;
