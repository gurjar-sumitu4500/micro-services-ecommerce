// ProductPage.js

import React, { useEffect } from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import ProductCard from './ProductCard';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/reducers/authSlice';
import axios from 'axios';

const ProductPage = () => {
  const dispatch = useDispatch();
  // Mock data for products
  const products = [
    { id: 1, name: 'Product 1', price: 20, image: 'product1.jpg' },
    { id: 2, name: 'Product 2', price: 30, image: 'product2.jpg' },
    // Add more products as needed
  ];
  useEffect(() => {
    axios.get('http://localhost:3002/api/product/get', { withCredentials: true })
    .then(res => console.log(res));
  }, [])

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome User
      </Typography>
      <Grid container spacing={2} justifyContent="flex-end">
        <Grid item>
          {/* Placeholder for user profile links */}
          <Button variant="text" color="inherit">Profile</Button>
          <Button variant="text" color="inherit">Settings</Button>
          <Button variant="text" color="inherit">Orders</Button>
          <Button variant="text" color="inherit" onClick={handleLogout}>Logout</Button>
        </Grid>
      </Grid>
      <Typography variant="h5" gutterBottom>
        Categories
      </Typography>
      {/* Placeholder for categories of products */}
      <Typography variant="h5" gutterBottom>
        Featured Products
      </Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductPage;
