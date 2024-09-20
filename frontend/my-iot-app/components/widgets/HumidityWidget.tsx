'use client';

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Opacity } from '@mui/icons-material';

interface HumidityWidgetProps {
  humidity: number;
}

const HumidityWidget: React.FC<HumidityWidgetProps> = ({ humidity }) => {
  return (
    <Card style={{ backgroundColor: '#add8e6' }}>
      <CardContent>
        <Typography variant="h6" align="center">
          <Opacity fontSize="large" />
        </Typography>
        <Typography variant="h4" align="center">
          {humidity}%
        </Typography>
        <Typography variant="subtitle1" align="center">
          Humidity
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HumidityWidget;
