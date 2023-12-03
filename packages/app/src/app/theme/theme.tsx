import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import React from 'react';
import Futura from '../../assets/fonts/Futura-Medium.woff';
import Roboto from '../../assets/fonts/Roboto-Medium.ttf';
import { useModeContext } from '../shared/hooks/useThemeMode';
import { buttonClasses, toggleButtonClasses } from '@mui/material';

interface ThemeInternalProps {
  children?: React.ReactNode;
}

export type ThemeProps = ThemeInternalProps;

export const Theme: React.FC<ThemeProps> = (props) => {
  const { children } = props;
  const { mode } = useModeContext();

  const baseTheme = createTheme({
    spacing: 4,
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'Futura';
            src: url(${Futura}) format('woff');
          }
          @font-face {
            font-family: 'Roboto';
            src: url(${Roboto}) format('truetype');
          }
        `,
      },
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#554DE2',
        contrastText: '#fff',
      },
      secondary: {
        main: '#554DE2',
        contrastText: '#fff',
      },
      background: {
        paper: '#fff',
        default: '#F2F3FA',
      },
      grey: {
        50: '#f2f3fa',
        100: '#000',
      },
    },
    typography: {
      h2: {
        color: '#333333', // Dark gray for H2 in light theme
      },
    },
    components: {
      MuiButtonBase: {
        styleOverrides: {
          root: {
            [`&.${buttonClasses.disabled}`]: {
              // Set the color for the disabled button
              color: '#808080 !important', // Adjust this color as needed
            },
            // Fix ButtonGroup disabled styles.
            [`&.${toggleButtonClasses.root}.${buttonClasses.disabled}`]: {
              color: '#757575', // Adjust this color as needed
              borderColor: '#757575', // Adjust this color as needed
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          input: {
            color: '#333333 !important', // Dark gray for text color in light theme
          },
        },
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#2979FF', // New primary color
        contrastText: '#fff',
      },
      secondary: {
        main: '#FF6D00', // New secondary color
        contrastText: '#fff',
      },
      background: {
        paper: '#222338',
        default: '#2e2f44',
      },
      grey: {
        50: '#1b1c31',
        100: '#fff',
      },
    },
    typography: {
      h2: {
        color: '#fff',
      },
    },
    components: {
      MuiButtonBase: {
        styleOverrides: {
          root: {
            [`&.${buttonClasses.disabled}`]: {
              color: '#757575 !important',
            },
            [`&.${toggleButtonClasses.root}.${buttonClasses.disabled}`]: {
              color: '#fff',
              borderColor: '#757575',
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          input: {
            color: '#fff !important', // Dark gray for text color in light theme
          },
        },
      },
    },
  });

  const fullLightTheme = createTheme(deepmerge(baseTheme, lightTheme));
  const fullDarkTheme = createTheme(deepmerge(baseTheme, darkTheme));

  return (
    <ThemeProvider theme={mode === 'light' ? fullLightTheme : fullDarkTheme}>
      {children}
    </ThemeProvider>
  );
};
