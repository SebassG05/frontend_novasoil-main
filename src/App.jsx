import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MapContainer from './components/Map/MapContainer';
import FloatingMenu from './components/Controls/FloatingMenu';
import SplashScreen from './components/SplashScreen/SplashScreen';
import Welcome from './components/Welcome/Welcome';
import useWelcome from './components/Welcome/useWelcome';
import Model3DLayer from './components/Map/Model3DLayer';
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
  const [splashVisible, setSplashVisible] = React.useState(true);
  const [showWelcome, setShowWelcome] = useWelcome(splashVisible);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <MapContainer />
        <Model3DLayer />
        <FloatingMenu />
        <SplashScreen onFinish={() => setSplashVisible(false)} />
        <Welcome visible={showWelcome} onClose={() => setShowWelcome(false)} />
      </div>
    </ThemeProvider>
  );
}

export default App;