// Register.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Grid, Paper } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerAsync } from '../redux/reducers/authSlice';
import styled from 'styled-components';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

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

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(registerAsync(values))
      .then((token) => {
        document.cookie = `token=${token}; path=/; secure; HttpOnly; SameSite=Strict`;
        navigate('/product');
      })
      .catch((error) => {
        // Handle registration error if needed
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <StyledContainer maxWidth="sm">
      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom>
          Register
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
                    name="name"
                    label="Name"
                    fullWidth
                    variant="outlined"
                  />
                  <ErrorMessage name="name" component={ErrorMessageStyled} />
                </Grid>
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
                    {isSubmitting || loading ? 'Submitting' : 'Register'}
                  </SubmitButton>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    Already have an account? <Link to="/login">Login here</Link>
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

export default Register;
