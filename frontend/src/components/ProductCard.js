// ProductCard.js

import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Button } from '@mui/material';

const ProductCard = ({ product }) => {
  const handleProductClick = () => {
    // Handle product click, navigate to product details page
  };

  return (
    <Card>
      <CardActionArea onClick={handleProductClick}>
        <CardMedia
          component="img"
          height="140"
          image={product.image}
          alt={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: ${product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardContent>
        <Button variant="contained" color="primary">
          Add to Cart
        </Button>
        <Button variant="contained" color="secondary">
          Like
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
