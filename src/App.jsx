import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import HebrewNamesTinder from './components/HebrewNamesTinder';

const theme = createTheme({
  shape: {
    borderRadius: 0, // Remove rounded corners
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#4A5568', // Desaturated slate blue-gray
      light: '#718096',
      dark: '#2D3748',
    },
    secondary: {
      main: '#718096', // Lighter slate gray
      light: '#A0AEC0',
      dark: '#4A5568',
    },
    background: {
      default: '#F7FAFC', // Very light blue-gray
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D3748', // Dark slate
      secondary: '#4A5568', // Medium slate
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    button: {
      textTransform: 'none', // Remove uppercase transformation
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: '8px 24px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ padding: '20px' }}>
        <HebrewNamesTinder />
      </div>
    </ThemeProvider>
  );
}

export default App;