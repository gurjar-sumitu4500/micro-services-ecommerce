// ProtectedRoute.js

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuthAsync } from '../redux/reducers/authSlice';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const dispatch = useDispatch();
  const isAuthenticatedRedux = useSelector((state) => {
    console.log(state);
    return state.auth.isAuthenticated
  });

  const isAuthenticated = isAuthenticatedRedux;
  if(!isAuthenticated){
    try{
      dispatch(checkAuthAsync()).then(res => {
        if(res.payload == 200) return <Outlet />
        return <Navigate to="/login" replace />
      })
    }catch(err){
      console.log(err)
    }
  }
  return <Outlet />
};

export default ProtectedRoute;
