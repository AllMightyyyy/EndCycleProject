'use client';

import { useState, useEffect } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import Dashboard from '../components/Dashboard';
import Chart from '../components/Chart';
import mockData from '../mockData/sensors';
import { SensorData } from '@/types/SensorData';

const Home = () => {
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter data based on selected date range
  const filteredData = mockData.filter((sensor) => {
    const timestamp = new Date(sensor.timestamp);
    if (startDate && timestamp < startDate.toDate()) return false;
    if (endDate && timestamp > endDate.toDate()) return false;
    return true;
  });

  // Get the latest data from the filtered data
  const latestData: SensorData = filteredData[filteredData.length - 1] || mockData[mockData.length - 1];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#031627', p: 3 }}>
      {/* Only render DateTimePickers after the component has mounted */}
      {mounted && (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {/* Dashboard */}
          <Paper
            sx={{
              p: 2,
              mb: 2,
              backgroundColor: '#f5f5f5', // Light grey for contrast
              borderRadius: 2,
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', // Keep the shadow for depth
              color: '#031627', // Fixed dark navy text color for readability
            }}
          >
            <Typography
              variant="h6"
              align="center"
              sx={{ color: '#031627', fontWeight: 700 }} // Fixed text color
            >
              Dashboard Overview
            </Typography>
            <Dashboard latestData={latestData} />
          </Paper>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              mb: 3,
              p: 2,
              borderRadius: 2,
              backgroundColor: '#f5f5f5', // Light grey background for DateTimePicker container
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
            }}
          >
            <DateTimePicker
              label="Start Date and Time"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: {
                    backgroundColor: '#ffffff', // Input fields styled to match
                    borderRadius: 2,
                    color: '#031627', // Fixed dark text color inside the input fields
                  },
                },
              }}
            />
            <DateTimePicker
              label="End Date and Time"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: {
                    backgroundColor: '#ffffff', // Input fields styled to match
                    borderRadius: 2,
                    color: '#031627', // Fixed dark text color inside the input fields
                  },
                },
              }}
            />
          </Box>
        </LocalizationProvider>
      )}

      {/* Chart */}
      <Paper
        sx={{
          p: 2,
          backgroundColor: '#f5f5f5', // Use the same light grey background
          borderRadius: 2,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
          color: '#031627', // Fixed dark navy text color
        }}
      >
        <Typography
          variant="h6"
          align="center"
          sx={{ color: '#031627', fontWeight: 700 }} // Fixed text color for the chart section
        >
          Sensor Data Chart
        </Typography>
        <Chart data={filteredData} />
      </Paper>
    </Box>
  );
};

export default Home;
