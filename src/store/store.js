import { configureStore } from '@reduxjs/toolkit';
import pasteReducer from '../redux/pasteSlice'; // Import the reducer, not the slice

export const store = configureStore({
  reducer: {
    pastes: pasteReducer, // Use the reducer here
  },
});

// reducer name can be anything, but it is recommended to use the same name as the slice