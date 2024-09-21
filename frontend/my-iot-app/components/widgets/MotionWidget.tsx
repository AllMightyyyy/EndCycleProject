'use client';

import React from 'react';
import { Card, CardContent, Typography, useTheme, Box } from '@mui/material';
import { DirectionsRun, AccessibilityNew } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface MotionWidgetProps {
  motionStatus: string; // Renamed prop
}

const MotionWidget: React.FC<MotionWidgetProps> = ({ motionStatus }) => {
  const theme = useTheme();
  const isDetected = motionStatus === 'detected';

  const getBackgroundColor = (status: string) => {
    return status === 'detected'
      ? 'linear-gradient(135deg, #98fb98 0%, #00c853 100%)'
      : 'linear-gradient(135deg, #f0e68c 0%, #FFD700 100%)';
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card
        sx={{
          background: getBackgroundColor(motionStatus),
          color: theme.palette.primary.contrastText,
          borderRadius: '20px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          padding: 2,
        }}
      >
        <CardContent>
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
              {isDetected ? (
                <DirectionsRun fontSize="large" sx={{ fontSize: '4rem' }} />
              ) : (
                <AccessibilityNew fontSize="large" sx={{ fontSize: '4rem' }} />
              )}
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
              {isDetected ? 'Detected' : 'No Motion'}
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
              Motion
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MotionWidget;
