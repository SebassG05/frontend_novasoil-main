import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MapContainer from './components/Map/MapContainer';
import FloatingMenu from './components/Controls/FloatingMenu';
import SplashScreen from './components/SplashScreen/SplashScreen';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <MapContainer />
        <FloatingMenu />
                <SplashScreen />
      </div>
    </ThemeProvider>
  );
}

export default App;