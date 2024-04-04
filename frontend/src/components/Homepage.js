// Index.js

import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const Background = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  overflow: hidden;
`;

const Content = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
`;

const Links = styled.div`
  margin-top: 2rem;
`;

const LinkButton = styled(Link)`
  margin-right: 1rem;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #fff;
  background-color: #007bff;
  border: 1px solid #007bff;
  border-radius: 5px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }
`;

const Homepage = () => {
  return (
    <Background>
      <Content>
        <Title>Welcome to Our Ecommerce Platform</Title>
        <Links>
          <LinkButton to="/login">Login</LinkButton>
          <LinkButton to="/register">Register</LinkButton>
        </Links>
      </Content>
    </Background>
  );
};

export default Homepage;
