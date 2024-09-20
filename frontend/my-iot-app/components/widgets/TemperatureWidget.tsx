'use client';

import React from 'react';
import { Card, CardContent, Typography, useTheme } from '@mui/material';
import { Thermostat } from '@mui/icons-material';

interface TemperatureWidgetProps {
  temperature: number;
}

const TemperatureWidget: React.FC<TemperatureWidgetProps> = ({ temperature }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
      }}
    >
      <CardContent>
        <Typography variant="h6" align="center">
          <Thermostat fontSize="large" />
        </Typography>
        <Typography variant="h4" align="center">
          {temperature}°C
        </Typography>
        <Typography variant="subtitle1" align="center">
          Temperature
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TemperatureWidget;
