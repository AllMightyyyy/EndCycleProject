'use client';

import React, { useState } from 'react';
import { Box, Typography, FormGroup, FormControlLabel, Switch, Slider, TextField, Button, Card, CardContent } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';

const SettingsPage = () => {
  // States for sensors
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [tempEnabled, setTempEnabled] = useState(true);
  const [humidityEnabled, setHumidityEnabled] = useState(true);
  const [ldrEnabled, setLdrEnabled] = useState(true);
  const [smokeEnabled, setSmokeEnabled] = useState(true);

  // Thresholds
  const [tempThreshold, setTempThreshold] = useState<number>(30);
  const [humidityThreshold, setHumidityThreshold] = useState<number>(30);
  const [smokeThreshold, setSmokeThreshold] = useState<number>(2000);
  const [ldrThreshold, setLdrThreshold] = useState<number>(500);

  // Notification settings
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  // Custom rules
  const [rule, setRule] = useState<string>('');

  const handleSave = () => {
    console.log({
      motionEnabled,
      tempEnabled,
      humidityEnabled,
      ldrEnabled,
      smokeEnabled,
      thresholds: {
        temperature: tempThreshold,
        humidity: humidityThreshold,
        smoke: smokeThreshold,
        ldr: ldrThreshold,
      },
      notifications: {
        email,
        phone,
      },
      rule,
    });
    alert('Settings Saved');
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#031627', minHeight: '100vh', color: '#f5f5f5' }}>
      <Typography variant="h3" align="center" gutterBottom>
        Settings Page
      </Typography>

      <Card sx={{ backgroundColor: '#04353A', p: 3, mb: 4, color: '#f5f5f5' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Enable/Disable Sensors
          </Typography>

          <FormGroup>
            <FormControlLabel
              control={<Switch checked={motionEnabled} onChange={() => setMotionEnabled(!motionEnabled)} />}
              label="Motion Sensor"
            />
            <FormControlLabel
              control={<Switch checked={tempEnabled} onChange={() => setTempEnabled(!tempEnabled)} />}
              label="Temperature Sensor"
            />
            <FormControlLabel
              control={<Switch checked={humidityEnabled} onChange={() => setHumidityEnabled(!humidityEnabled)} />}
              label="Humidity Sensor"
            />
            <FormControlLabel
              control={<Switch checked={ldrEnabled} onChange={() => setLdrEnabled(!ldrEnabled)} />}
              label="LDR (Light Sensor)"
            />
            <FormControlLabel
              control={<Switch checked={smokeEnabled} onChange={() => setSmokeEnabled(!smokeEnabled)} />}
              label="Smoke Sensor"
            />
          </FormGroup>
        </CardContent>
      </Card>

      <Card sx={{ backgroundColor: '#08293C', p: 3, mb: 4, color: '#f5f5f5' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Set Alarm Thresholds
          </Typography>
          <Typography gutterBottom>Temperature Threshold (°C)</Typography>
          <Slider
            value={tempThreshold}
            onChange={(e, newValue) => setTempThreshold(newValue as number)}
            min={0}
            max={50}
            valueLabelDisplay="auto"
          />
          <Typography gutterBottom>Humidity Threshold (%)</Typography>
          <Slider
            value={humidityThreshold}
            onChange={(e, newValue) => setHumidityThreshold(newValue as number)}
            min={0}
            max={100}
            valueLabelDisplay="auto"
          />
          <Typography gutterBottom>Smoke Threshold</Typography>
          <Slider
            value={smokeThreshold}
            onChange={(e, newValue) => setSmokeThreshold(newValue as number)}
            min={0}
            max={4000}
            valueLabelDisplay="auto"
          />
          <Typography gutterBottom>LDR Threshold</Typography>
          <Slider
            value={ldrThreshold}
            onChange={(e, newValue) => setLdrThreshold(newValue as number)}
            min={0}
            max={1024}
            valueLabelDisplay="auto"
          />
        </CardContent>
      </Card>

      <Card sx={{ backgroundColor: '#04353A', p: 3, mb: 4, color: '#f5f5f5' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Notification Settings
          </Typography>

          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </CardContent>
      </Card>

      <Card sx={{ backgroundColor: '#08293C', p: 3, mb: 4, color: '#f5f5f5' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Custom Rules and Alerts
          </Typography>

          <TextField
            label="Custom Rule"
            variant="outlined"
            fullWidth
            multiline
            rows={2}
            sx={{ mb: 2 }}
            value={rule}
            onChange={(e) => setRule(e.target.value)}
            placeholder="Example: If motion is detected AND temperature > 30°C, send an alert"
          />
        </CardContent>
      </Card>

      <Box textAlign="center" mt={4}>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#8fdf82', color: '#031627' }}
          onClick={handleSave}
        >
          Save Settings
        </Button>
      </Box>
    </Box>
  );
};

export default SettingsPage;
