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
    // Logo en la esquina superior izquierda
    const logoUrl = "https://res.cloudinary.com/drwlnxvqr/image/upload/v1759745772/favicon_nm8bmc.png";
    const logoUrl2 = "https://res.cloudinary.com/drwlnxvqr/image/upload/v1759746176/european-union-logo-vector_uvmoml.svg";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        {/* Contenedor de logos y texto en la esquina superior izquierda */}
        <div
          style={{
            position: 'fixed',
            top: 12,
            left: 22,
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src={logoUrl}
              alt="Logo Novasoil"
              style={{
                width: 105,
                height: 68,
                marginLeft: '44px',
                marginBottom: '-24px',
              }}
            />
            <img
              src={logoUrl2}
              alt="Logo Unión Europea"
              style={{
                width: 105,
                height: 110,
                marginTop: '8px', 
                marginBottom: '-24px',
              }}
            />
          </div>
          <span style={{ marginTop: '8px', fontSize: '10px', color: '#222', padding: '2px 8px', borderRadius: '6px', fontWeight: 500 }}>
            Funded by the European Union. Grant agreement ID: 101091268
          </span>
        </div>
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