import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here if needed
  },
  devTools: true
});

store.subscribe(() => {
  console.log('Dispatched action:', store.getState());
});

export default store;
