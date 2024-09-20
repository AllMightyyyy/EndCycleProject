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

const drawerWidth = 240;

export default function RootLayout({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box>
      <Toolbar />
      <Divider />
      <List>
        <ListItemButton component={Link} href="/">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton component={Link} href="/sensors">
          <ListItemIcon>
            <SensorsIcon />
          </ListItemIcon>
          <ListItemText primary="Sensors" />
        </ListItemButton>
        <ListItemButton component={Link} href="/settings">
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
        <ListItemButton component={Link} href="/logs">
          <ListItemIcon>
            <LogsIcon />
          </ListItemIcon>
          <ListItemText primary="Logs" />
        </ListItemButton>
        <ListItemButton component={Link} href="/alerts">
          <ListItemIcon>
            <AlertsIcon />
          </ListItemIcon>
          <ListItemText primary="Alerts" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Box sx={{ display: 'flex', backgroundColor: theme.palette.background.paper, }}>
            <CssBaseline />

            {/* Sidebar */}
            <Drawer
              variant={isMobile ? 'temporary' : 'permanent'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
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
              }}
            >
              {/* Top Bar */}
              <AppBar
                position="fixed"
                sx={{
                  zIndex: theme.zIndex.drawer + 1,
                  backgroundColor: theme.palette.primary.main,
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
                      sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                      <MenuIcon />
                    </IconButton>
                  )}

                  <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                    IoT Management - Zakaria Farih
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
                  minHeight: '100vh',
                  backgroundColor: theme.palette.background.default,
                  color: theme.palette.text.primary,
                }}
              >
                {children}
              </Box>
            </Box>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
