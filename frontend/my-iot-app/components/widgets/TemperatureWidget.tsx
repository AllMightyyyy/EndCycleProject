'use client';

import React from 'react';
import { Card, CardContent, Typography, useTheme, Box } from '@mui/material';
import { Thermostat } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface TemperatureWidgetProps {
  temperature: number;
}

const TemperatureWidget: React.FC<TemperatureWidgetProps> = ({ temperature }) => {
  const theme = useTheme();

  // Define gradient based on temperature ranges (for a nice visual effect)
  const getBackgroundColor = (temp: number) => {
    if (temp < 15) return 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)'; // Cold
    if (temp >= 15 && temp <= 25) return 'linear-gradient(135deg, #00ff73 0%, #00c853 100%)'; // Mild
    return 'linear-gradient(135deg, #ff6b6b 0%, #ff3d00 100%)'; // Hot
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card
        sx={{
          background: getBackgroundColor(temperature),
          color: theme.palette.primary.contrastText,
          borderRadius: '20px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          padding: 2,
        }}
      >
        <CardContent>
          {/* Icon with animated temperature reading */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              padding: '20px 0',
            }}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Thermostat fontSize="large" sx={{ fontSize: '4rem' }} />
            </motion.div>

            <Typography
              variant="h3"
              align="center"
              sx={{
                fontWeight: 700,
                fontSize: '3rem',
                marginTop: '10px',
              }}
            >
              {temperature}°C
            </Typography>

            <Typography
              variant="subtitle1"
              align="center"
              sx={{
                fontWeight: 500,
                marginTop: '10px',
                letterSpacing: '1px',
              }}
            >
              Temperature
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TemperatureWidget;
