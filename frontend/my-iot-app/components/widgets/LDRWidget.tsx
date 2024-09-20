'use client';

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { WbSunny } from '@mui/icons-material';

interface LDRWidgetProps {
  ldr: number;
}

const LDRWidget: React.FC<LDRWidgetProps> = ({ ldr }) => {
  return (
    <Card style={{ backgroundColor: '#fffacd' }}>
      <CardContent>
        <Typography variant="h6" align="center">
          <WbSunny fontSize="large" />
        </Typography>
        <Typography variant="h4" align="center">
          {ldr} lux
        </Typography>
        <Typography variant="subtitle1" align="center">
          Light Intensity
        </Typography>
      </CardContent>
    </Card>
  );
};

export default LDRWidget;
