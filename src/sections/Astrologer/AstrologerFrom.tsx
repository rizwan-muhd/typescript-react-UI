import React from "react";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
// import {addAstrologer } from "../../redux/slices/Astrologer";
// import Languages from '../../assets/data/Languages'
import {
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  //   MenuItem,
  FormHelperText,
  Button,
  MenuItem,
} from "@mui/material";

interface AstrologerDetails {
  name: string;
  gender: string;
  email: string;
  languages: string[];
  specialties: string[];
}

function AstrologerAddForm() {
  // const dispatch = useDispatch()
  const astrologerSpecialitiesList = [
    "Astrology",
    "Numerology",
    "Tarot Reading",
    "Palmistry",
    "Horoscope Analysis",
    "Astrological Counseling",
    "Astrological Research",
    "Astrological Education",
    "Vedic Astrology",
    "Western Astrology",
  ];

  const languages = [
    // Indian languages
    "Hindi",
    "Bengali",
    "Telugu",
    "Marathi",
    "Tamil",
    "Urdu",
    "Gujarati",
    "Malayalam",
    "Kannada",
    "Odia",
    "Punjabi",
    "Assamese",

    // International languages
    "English",
    "Spanish",
    "Mandarin",
    "Arabic",
    "Russian",
    "French",
    "German",
    "Japanese",
    "Portuguese",
    "Italian",
    "Dutch",
    "Swedish",
    "Korean",
    "Turkish",
    "Vietnamese",
  ];
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      gender: "",
      email: "",
      languages: [],
      specialties: [],
    } as AstrologerDetails,

    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      gender: Yup.string().required("Gender is required"),
      email: Yup.string().required("Email is Required"),
      languages: Yup.array()
        .of(Yup.string().required("Language is required"))
        .required("At least one language is required"),
      specialties: Yup.array()
        .of(Yup.string().required("Specialties is required"))
        .required("At least one specialty is required"),
    }),

    onSubmit: async (values: AstrologerDetails, { setSubmitting, resetForm, setErrors }) => {
      try {
        console.log(setSubmitting, setErrors, resetForm, values);
        console.log("submitted values", values);
        // dispatch(addAstrologer(values))
      } catch (error) {
        console.log(error);
      }
    },
  });

  const {
    errors,
    values,
    touched,
    handleSubmit,
    handleChange,
  } = formik;

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <TextField
                id="outlined-error-helper-text"
                fullWidth
                size="small"
                label="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">
                  Select Gender
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="gender"
                  value={values.gender}
                  label="Gender"
                  onChange={handleChange}
                  error={Boolean(touched.gender && errors.gender)}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">other</MenuItem>
                </Select>
                {touched.gender && errors.gender && (
                  <FormHelperText error>{errors.gender}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <TextField
                id="outlined-error-helper-text"
                fullWidth
                size="small"
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">
                  Select Language
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="languages"
                  multiple
                  value={values.languages}
                  label="Language"
                  onChange={handleChange}
                  error={Boolean(touched.languages && errors.languages)}
                >
                  {languages?.map((val) => (
                    <MenuItem value={val}>{val}</MenuItem>
                  ))}
                </Select>
                {touched.gender && errors.gender && (
                  <FormHelperText error>{errors.gender}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">
                  Select Specialties
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="specialties"
                  multiple
                  value={values.specialties}
                  label="Specialties"
                  onChange={handleChange}
                  error={Boolean(touched.specialties && errors.specialties)}
                >
                  {astrologerSpecialitiesList?.map((val) => (
                    <MenuItem value={val}>{val}</MenuItem>
                  ))}
                </Select>
                {touched.specialties && errors.specialties && (
                  <FormHelperText error>{errors.specialties}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="small"
                // loading={isSubmitting}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Box>
  );
}

export default AstrologerAddForm;
