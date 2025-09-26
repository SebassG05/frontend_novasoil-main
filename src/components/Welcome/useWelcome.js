import { useState, useEffect } from 'react';

// Hook para controlar la bienvenida tras el SplashScreen
export default function useWelcome(splashVisible) {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (!splashVisible) {
  // Espera 1s para transición tras SplashScreen
  const t = setTimeout(() => setShowWelcome(true), 1000);
      return () => clearTimeout(t);
    } else {
      setShowWelcome(false);
    }
  }, [splashVisible]);

  return [showWelcome, setShowWelcome];
}
