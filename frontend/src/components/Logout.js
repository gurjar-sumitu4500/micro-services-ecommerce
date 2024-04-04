// Logout.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/reducers/authSlice';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Dispatch logout action
    dispatch(logout());

    // Redirect to login page after logout
    navigate('/login');
  }, [dispatch, navigate]);

  return null; // Render nothing in the Logout component
};

export default Logout;
