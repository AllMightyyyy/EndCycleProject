'use client';

import { ReactNode, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Drawer,
  CssBaseline,
  useMediaQuery,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Snackbar,
  Alert,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Sensors as SensorsIcon,
  Settings as SettingsIcon,
  ListAlt as LogsIcon,
  Notifications as AlertsIcon,
} from '@mui/icons-material';
import ThemeToggle from '../components/ThemeToggle';
import { ThemeProvider } from '../context/ThemeContext';
import Link from 'next/link';
import ReactAnimatedWeather from 'react-animated-weather';

const drawerWidth = 240;

export default function RootLayout({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  // State for Snackbar (notification)
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Handle drawer toggle for mobile devices
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Handle Snackbar open/close
  const handleAlertsClick = () => {
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const iconColor = '#f5f5f5'; // Set a constant color for all icons

  const drawerContent = (
    <Box>
      <Toolbar />
      <Divider />
      <List>
        <ListItemButton component={Link} href="/">
          <ListItemIcon>
            <DashboardIcon sx={{ color: iconColor }} /> {/* Set icon color */}
          </ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ color: iconColor }} /> {/* Set text color */}
        </ListItemButton>
        <ListItemButton component={Link} href="/sensors">
          <ListItemIcon>
            <SensorsIcon sx={{ color: iconColor }} /> {/* Set icon color */}
          </ListItemIcon>
          <ListItemText primary="Sensors" sx={{ color: iconColor }} /> {/* Set text color */}
        </ListItemButton>
        <ListItemButton component={Link} href="/weather">
          {/* Weather icon with constant white color */}
          <ListItemIcon>
            <ReactAnimatedWeather
              icon="PARTLY_CLOUDY_DAY"
              color={iconColor}  // Set constant white color
              size={24}
              animate={true}
            />
          </ListItemIcon>
          <ListItemText primary="Weather" sx={{ color: iconColor }} /> {/* Set text color */}
        </ListItemButton>
        <ListItemButton component={Link} href="/settings">
          <ListItemIcon>
            <SettingsIcon sx={{ color: iconColor }} /> {/* Set icon color */}
          </ListItemIcon>
          <ListItemText primary="Settings" sx={{ color: iconColor }} /> {/* Set text color */}
        </ListItemButton>
        <ListItemButton component={Link} href="/logs">
          <ListItemIcon>
            <LogsIcon sx={{ color: iconColor }} /> {/* Set icon color */}
          </ListItemIcon>
          <ListItemText primary="Logs" sx={{ color: iconColor }} /> {/* Set text color */}
        </ListItemButton>
        <ListItemButton onClick={handleAlertsClick}> {/* Add click handler */}
          <ListItemIcon>
            <AlertsIcon sx={{ color: iconColor }} /> {/* Set icon color */}
          </ListItemIcon>
          <ListItemText primary="Alerts" sx={{ color: iconColor }} /> {/* Set text color */}
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Sidebar */}
            <Drawer
              variant={isMobile ? 'temporary' : 'permanent'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: drawerWidth,
                  backgroundColor: '#031627',
                  color: '#f5f5f5',
                },
              }}
            >
              {drawerContent}
            </Drawer>

            {/* Main Content */}
            <Box
              sx={{
                flexGrow: 1,
                ml: { sm: `${drawerWidth}px` },
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                backgroundColor: '#031627',
              }}
            >
              {/* Top Bar */}
              <AppBar
                position="fixed"
                sx={{
                  zIndex: theme.zIndex.drawer + 1,
                  backgroundColor: '#031627',
                  color: theme.palette.primary.contrastText,
                }}
              >
                <Toolbar>
                  {isMobile && (
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      edge="start"
                      onClick={handleDrawerToggle}
                      sx={{ mr: 2 }}
                    >
                      <MenuIcon sx={{ color: iconColor }} /> {/* Set icon color */}
                    </IconButton>
                  )}

                  <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                    IoT Management
                  </Typography>

                  <IconButton color="inherit">
                    <ThemeToggle />
                  </IconButton>
                </Toolbar>
              </AppBar>

              {/* Main Content */}
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  p: 2,
                  mt: '64px',
                  backgroundColor: '#031627',
                  color: theme.palette.text.primary,
                }}
              >
                {children}
              </Box>

              {/* Snackbar Notification */}
              <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              >
                <Alert onClose={handleSnackbarClose} severity="info" sx={{ width: '100%' }}>
                  Alerts page is not yet implemented.
                </Alert>
              </Snackbar>
            </Box>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
