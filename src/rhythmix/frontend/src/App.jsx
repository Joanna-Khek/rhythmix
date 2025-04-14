import {React, useEffect, useMemo, useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Ensure you're using BrowserRouter
import AxiosInstance from './components/Axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css'
import Home from './components/Home'
import Recommender from './components/Recommender';

function App() {
  const theme = createTheme({
      typography: {
        fontFamily: "'Quantico', sans-serif",
      },
    });

    const drawerCloseWidth = 72;
    const drawerOpenWidth = 240;

    const [myData, setMyData] = useState([])
    const [myPrompt, setPrompt] = useState([])

    const GetData = () =>{
        AxiosInstance.get(`api-check/`).then((res) =>{
          setMyData(res.data)
        } )

        AxiosInstance.get(`initial-prediction/`).then((res) => {
          setPrompt(res.data)
        } )
    }

    useEffect(() =>{
        GetData()
    },[])

    console.log(myPrompt)

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
                data={myData}/>
            }
          />
          <Route
            path="/recommender"
            element={
              <Recommender
                drawerCloseWidth={drawerCloseWidth}
                drawerOpenWidth={drawerOpenWidth}
                data={myPrompt}/>
            }
          />
        </Routes>
      </ThemeProvider>
      </Router>
  )
}

export default App
