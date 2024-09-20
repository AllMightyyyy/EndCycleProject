'use client';

import React from 'react';
import { Grid } from '@mui/material';
import TemperatureWidget from './widgets/TemperatureWidget';
import HumidityWidget from './widgets/HumidityWidget';
import MotionWidget from './widgets/MotionWidget';
import LDRWidget from './widgets/LDRWidget';
import { SensorData } from '@/types/SensorData';

interface DashboardProps {
  latestData: SensorData;
}

const Dashboard: React.FC<DashboardProps> = ({ latestData }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <TemperatureWidget temperature={latestData.temperature} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <HumidityWidget humidity={latestData.humidity} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <MotionWidget motion={latestData.motion} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <LDRWidget ldr={latestData.ldr} />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
