import {React, useEffect, useMemo, useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Ensure you're using BrowserRouter
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css'
import Home from './components/Home'
import SongsSaved from './components/SongsSaved';

function App() {
  const theme = createTheme({
      typography: {
        fontFamily: "'Quantico', sans-serif",
      },
    });

    const drawerCloseWidth = 72;
    const drawerOpenWidth = 240;

  return (
      <Router> {/* Wrap the entire app with Router to enable routing */}
      <ThemeProvider theme={theme}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                drawerCloseWidth={drawerCloseWidth}
                drawerOpenWidth={drawerOpenWidth}
              />
            }
          />
          <Route
            path="/songs"
            element={
              <SongsSaved
                drawerCloseWidth={drawerCloseWidth}
                drawerOpenWidth={drawerOpenWidth}
                />}
          />
        </Routes>
      </ThemeProvider>
      </Router>
  )
}

export default App
