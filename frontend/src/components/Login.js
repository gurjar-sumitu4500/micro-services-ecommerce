// Login.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Grid, Paper } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik'; // Import Formik components
import * as Yup from 'yup'; // Import Yup for form validation
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../redux/reducers/authSlice';
import styled from 'styled-components'; // Import styled-components

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

// Define styled components
const StyledContainer = styled(Container)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPaper = styled(Paper)`
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ErrorMessageStyled = styled.div`
  color: red;
`;

const SubmitButton = styled(Button)`
  margin-top: 1rem;
`;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(loginAsync(values))
      .then((token) => {
        navigate('/product');
      })
      .catch((error) => {
        // Handle login error if needed
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <StyledContainer maxWidth="sm">
      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="outlined"
                  />
                  <ErrorMessage name="email" component={ErrorMessageStyled} />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                  />
                  <ErrorMessage name="password" component={ErrorMessageStyled} />
                </Grid>
                <Grid item xs={12}>
                  <SubmitButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting || loading}
                    fullWidth
                  >
                    {isSubmitting || loading ? 'Submitting' : 'Login'}
                  </SubmitButton>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    Don't have an account? <Link to="/register">Register here</Link>
                  </Typography>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Login;
