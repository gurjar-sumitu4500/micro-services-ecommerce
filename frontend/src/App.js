// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import ProductPage from './components/ProductPage'; // Import ProductPage component
import Homepage from './components/Homepage';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes> {/* Use Routes instead of Switch */}
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route element={<ProtectedRoute />}> 
            <Route path="/product" element={<ProductPage />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
