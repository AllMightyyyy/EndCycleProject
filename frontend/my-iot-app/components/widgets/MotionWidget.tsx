'use client';

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { DirectionsRun, AccessibilityNew } from '@mui/icons-material';

interface MotionWidgetProps {
  motion: string;
}

const MotionWidget: React.FC<MotionWidgetProps> = ({ motion }) => {
  const isDetected = motion === 'detected';

  return (
    <Card style={{ backgroundColor: isDetected ? '#98fb98' : '#f0e68c' }}>
      <CardContent>
        <Typography variant="h6" align="center">
          {isDetected ? (
            <DirectionsRun fontSize="large" />
          ) : (
            <AccessibilityNew fontSize="large" />
          )}
        </Typography>
        <Typography variant="h4" align="center">
          {isDetected ? 'Detected' : 'No Motion'}
        </Typography>
        <Typography variant="subtitle1" align="center">
          Motion
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MotionWidget;
