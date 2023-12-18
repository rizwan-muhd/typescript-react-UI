import React, { useEffect } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  addAstrologer,
  getMyAstrologer,
  updateAstrologer,
} from "../../redux/slices/Astrologer";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const astrologer = useAppSelector((state) => state.astrologer.meAstrologer);
  // const filterdAstrologer = astrologer.data.filter((data) => {

  // })
  console.log("params", params, astrologer);
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
      name:
        params.id && Array.isArray(astrologer) && astrologer.length > 0
          ? astrologer[0].name
          : "",
      gender:
        params.id && Array.isArray(astrologer) && astrologer.length > 0
          ? astrologer[0].gender
          : "",
      email:
        params.id && Array.isArray(astrologer) && astrologer.length > 0
          ? astrologer[0].email
          : "",
      languages:
        params.id && Array.isArray(astrologer) && astrologer.length > 0
          ? astrologer[0].languages
          : [],
      specialties:
        params.id && Array.isArray(astrologer) && astrologer.length > 0
          ? astrologer[0].specialties
          : [],
    } as AstrologerDetails,

    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      gender: Yup.string().required("Gender is required"),
      email: Yup.string().required("Email is Required"),
      languages: Yup.array()
        .of(Yup.string().oneOf(languages, "Invalid language"))
        .min(1, "At least one language is required")
        .required("At least one language is required"),
      specialties: Yup.array()
        .of(
          Yup.string().oneOf(astrologerSpecialitiesList, "Invalid specialties")
        )
        .min(1, "At least one specialties is required")
        .required("At least one specialties is required"),
    }),

    onSubmit: async (
      values: AstrologerDetails,
      { setSubmitting, resetForm, setErrors }
    ) => {
      try {
        console.log(setSubmitting, setErrors, resetForm, values);
        console.log("submitted values", values);
        if (params.id) {
          await dispatch(updateAstrologer({ values, id: params.id })).then(
            (res) => {
              console.log("result", res);
              console.log("asdasdas", res);
              if (res.payload.status === "success") {
                navigate("/astrologer-list");
                resetForm();
              }
            }
          );
        } else {
          await dispatch(addAstrologer({ values })).then((res) => {
            console.log("result", res);
            console.log("asdasdas", res);
            if (res.payload.status === "success") {
              navigate("/astrologer-list");
              resetForm();
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { errors, values, touched, handleSubmit, handleChange } = formik;

  useEffect(() => {
    if (params.id) {
      dispatch(getMyAstrologer({ id: params.id })).then((response) => {
        // Check if the response is successful and has data
        console.log("res asidasdhasdhj", response);
        if (response.payload.status === "success" && response.payload.data) {
          // Set initial values for the form
          formik.setValues({
            name: response.payload[0].name,
            gender: response.payload.gender,
            email: response.payload.email,
            languages: response.payload.languages,
            specialties: response.payload.specialties,
          });
        }
      });
    }
  }, [params.id, formik.setValues]);
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
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  ))}
                </Select>
                {touched.languages && errors.languages && (
                  <FormHelperText error>{errors.languages}</FormHelperText>
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
                {params.id ? "Update" : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Box>
  );
}

export default AstrologerAddForm;
