'use client';

import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { Thermostat, Opacity, LightMode, DirectionsRun, SmokeFree } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface SensorData {
  motion: string;
  temperature: number;
  humidity: number;
  ldr: number;
  smoke: number;
}

const placeholderData: SensorData = {
  motion: 'detected',
  temperature: 23.5,
  humidity: 50,
  ldr: 1200,
  smoke: 800
};

const SensorPage = () => {
  const [sensorData, setSensorData] = useState<SensorData | null>(null);

  useEffect(() => {
    // Simulating fetching data by using placeholder data after a small delay
    setTimeout(() => {
      setSensorData(placeholderData);
    }, 1000); // 1 second delay to simulate an API call
  }, []);

  if (!sensorData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h5" sx={{ color: '#f5f5f5' }}>
          Loading sensor data...
        </Typography>
      </Box>
    );
  }

  const sensorCards = [
    {
      icon: <Thermostat sx={{ fontSize: '3rem', color: '#f5f5f5' }} />,
      label: 'Temperature',
      value: `${sensorData.temperature}°C`,
      description: 'Current temperature detected by the DHT22 sensor',
      background: sensorData.temperature < 15
        ? 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)'
        : sensorData.temperature <= 25
        ? 'linear-gradient(135deg, #00ff73 0%, #00c853 100%)'
        : 'linear-gradient(135deg, #ff6b6b 0%, #ff3d00 100%)'
    },
    {
      icon: <Opacity sx={{ fontSize: '3rem', color: '#f5f5f5' }} />,
      label: 'Humidity',
      value: `${sensorData.humidity}%`,
      description: 'Humidity level detected by the DHT22 sensor',
      background: 'linear-gradient(135deg, #add8e6 0%, #00c6ff 100%)'
    },
    {
      icon: <LightMode sx={{ fontSize: '3rem', color: '#f5f5f5' }} />,
      label: 'Light Intensity',
      value: `${sensorData.ldr} lux`,
      description: 'Light intensity detected by the LDR sensor',
      background: 'linear-gradient(135deg, #f0e68c 0%, #FFD700 100%)'
    },
    {
      icon: <DirectionsRun sx={{ fontSize: '3rem', color: '#f5f5f5' }} />,
      label: 'Motion',
      value: sensorData.motion === 'detected' ? 'Detected' : 'No Motion',
      description: 'Motion detected by the PIR sensor',
      background: sensorData.motion === 'detected'
        ? 'linear-gradient(135deg, #98fb98 0%, #00c853 100%)'
        : 'linear-gradient(135deg, #f0e68c 0%, #FFD700 100%)'
    },
    {
      icon: <SmokeFree sx={{ fontSize: '3rem', color: '#f5f5f5' }} />,
      label: 'Smoke Level',
      value: sensorData.smoke > 2000 ? 'High' : 'Normal',
      description: 'Smoke level detected by the smoke sensor',
      background: sensorData.smoke > 2000
        ? 'linear-gradient(135deg, #ff6b6b 0%, #ff3d00 100%)'
        : 'linear-gradient(135deg, #98fb98 0%, #00c853 100%)'
    }
  ];

  return (
    <Box sx={{ p: 4, backgroundColor: '#031627', minHeight: '100vh' }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ color: '#f5f5f5', mb: 4 }}>
        Sensor Overview
      </Typography>

      <Grid container spacing={4}>
        {sensorCards.map((sensor, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card
                sx={{
                  background: sensor.background,
                  color: '#f5f5f5',
                  borderRadius: '20px',
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                  p: 3,
                  minHeight: '250px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    {sensor.icon}
                  </Box>
                  <Typography variant="h5" align="center" sx={{ mb: 1 }}>
                    {sensor.label}
                  </Typography>
                  <Typography variant="h4" align="center" sx={{ fontWeight: 'bold' }}>
                    {sensor.value}
                  </Typography>
                  <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                    {sensor.description}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SensorPage;
