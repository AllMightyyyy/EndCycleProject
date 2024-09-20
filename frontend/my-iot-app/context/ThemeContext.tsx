'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

type ThemeMode = 'light' | 'dark';

interface ThemeContextProps {
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: themeMode === 'light' ? '#5DA3FA' : '#1E90FF',
        contrastText: '#ffffff',
      },
      secondary: {
        main: themeMode === 'light' ? '#FFB6C1' : '#F08080',
        contrastText: '#ffffff',
      },
      background: {
        default: themeMode === 'light' ? '#F7F9FC' : '#121212',
        paper: themeMode === 'light' ? '#ffffff' : '#1D1D1D',
      },
      text: {
        primary: themeMode === 'light' ? '#333333' : '#ffffff',
        secondary: themeMode === 'light' ? '#555555' : '#B0B0B0',
      },
    },
    typography: {
      fontFamily: `'Poppins', sans-serif`,
      h6: {
        fontWeight: 600,
      },
      h1: {
        fontWeight: 700,
      },
      body1: {
        fontSize: '1rem',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            textTransform: 'none',
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};