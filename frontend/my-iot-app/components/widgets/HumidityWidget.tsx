'use client';

import React from 'react';
import { Card, CardContent, Typography, useTheme, Box } from '@mui/material';
import { Opacity } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface HumidityWidgetProps {
  humidity: number;
}

const HumidityWidget: React.FC<HumidityWidgetProps> = ({ humidity }) => {
  const theme = useTheme();

  // Define gradient based on humidity levels (to give it a visual effect)
  const getBackgroundColor = (humidity: number) => {
    if (humidity < 30) return 'linear-gradient(135deg, #ffdde1 0%, #ee9ca7 100%)'; // Dry
    if (humidity >= 30 && humidity <= 60) return 'linear-gradient(135deg, #8fdf82 0%, #8fdf82 100%)'; // Comfortable
    return 'linear-gradient(135deg, #add8e6 0%, #00c6ff 100%)'; // Humid
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card
        sx={{
          background: getBackgroundColor(humidity),
          color: theme.palette.primary.contrastText,
          borderRadius: '20px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          padding: 2,
        }}
      >
        <CardContent>
          {/* Icon with animated humidity reading */}
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
              <Opacity fontSize="large" sx={{ fontSize: '4rem' }} />
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
              {humidity}%
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
              Humidity
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HumidityWidget;
