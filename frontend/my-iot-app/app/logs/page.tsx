'use client';

import { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Grid, TextField, Slider, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import mockData from '@/mockData/sensors';

interface SensorData {
  id: number;
  motion: string;
  temperature: number;
  humidity: number;
  ldr: number;
  timestamp: string;
}

const LogsPage = () => {
  const [logs, setLogs] = useState<SensorData[]>(mockData);
  const [filteredLogs, setFilteredLogs] = useState<SensorData[]>(mockData);

  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [tempRange, setTempRange] = useState<number[]>([20, 30]);
  const [humidityRange, setHumidityRange] = useState<number[]>([40, 70]);
  const [ldrRange, setLdrRange] = useState<number[]>([100, 500]);

  useEffect(() => {
    filterLogs();
  }, [startDate, endDate, tempRange, humidityRange, ldrRange]);

  const filterLogs = () => {
    let filtered = logs;

    // Filter by date range
    if (startDate) {
      filtered = filtered.filter(log => new Date(log.timestamp) >= new Date(startDate.toISOString()));
    }
    if (endDate) {
      filtered = filtered.filter(log => new Date(log.timestamp) <= new Date(endDate!.toISOString()));
    }

    // Filter by temperature range
    filtered = filtered.filter(log => log.temperature >= tempRange[0] && log.temperature <= tempRange[1]);

    // Filter by humidity range
    filtered = filtered.filter(log => log.humidity >= humidityRange[0] && log.humidity <= humidityRange[1]);

    // Filter by LDR range
    filtered = filtered.filter(log => log.ldr >= ldrRange[0] && log.ldr <= ldrRange[1]);

    setFilteredLogs(filtered);
  };

  const resetFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setTempRange([20, 30]);
    setHumidityRange([40, 70]);
    setLdrRange([100, 500]);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 4, backgroundColor: '#031627', minHeight: '100vh', color: '#f5f5f5' }}>
        <Typography variant="h3" align="center" gutterBottom>
          Logs Page
        </Typography>

        {/* Filters Section */}
        <Box
          sx={{
            mb: 4,
            p: 3,
            backgroundColor: '#08293C',  
            borderRadius: '10px',
            boxShadow: 'none', 
            color: '#f5f5f5',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Filters
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button variant="outlined" fullWidth onClick={resetFilters}>
                Reset Filters
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography>Temperature Range (°C)</Typography>
                <Slider
                  value={tempRange}
                  onChange={(e, newValue) => setTempRange(newValue as number[])}
                  valueLabelDisplay="auto"
                  min={0}
                  max={50}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography>Humidity Range (%)</Typography>
                <Slider
                  value={humidityRange}
                  onChange={(e, newValue) => setHumidityRange(newValue as number[])}
                  valueLabelDisplay="auto"
                  min={0}
                  max={100}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography>LDR Range</Typography>
                <Slider
                  value={ldrRange}
                  onChange={(e, newValue) => setLdrRange(newValue as number[])}
                  valueLabelDisplay="auto"
                  min={0}
                  max={1024}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* Logs Section */}
        <Grid container spacing={2}>
          {filteredLogs.map((log) => (
            <Grid item xs={12} sm={6} md={4} key={log.id}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <Card
                  sx={{
                    background: '#04353A',  // Darker neutral green
                    color: '#f5f5f5',  // Keep the text light for contrast
                    borderRadius: '10px',
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',  // Slight shadow
                    overflow: 'hidden',
                    p: 2,
                    '&:hover': {  // Slight hover effect
                      transform: 'scale(1.03)',
                      transition: 'transform 0.3s ease-in-out',
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Log ID: {log.id}
                    </Typography>
                    <Typography variant="body2">Motion: {log.motion}</Typography>
                    <Typography variant="body2">Temperature: {log.temperature}°C</Typography>
                    <Typography variant="body2">Humidity: {log.humidity}%</Typography>
                    <Typography variant="body2">LDR: {log.ldr}</Typography>
                    <Typography variant="body2">Timestamp: {new Date(log.timestamp).toLocaleString()}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default LogsPage;
