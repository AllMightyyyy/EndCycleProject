'use client';

import { useState, useEffect } from 'react';
import { Box, Paper } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import Dashboard from '../components/Dashboard';
import Chart from '../components/Chart';
import mockData from '../mockData/sensors';
import { SensorData } from '@/types/SensorData';
import { useTheme } from '@mui/material/styles';

const Home = () => {
  const theme = useTheme();
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
          <Paper sx={{ p: 2, mb: 2, backgroundColor: theme.palette.background.paper }}>
            <Dashboard latestData={latestData} />
          </Paper>
          
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              mb: 3,
              p: 2,
              borderRadius: 2,
              backgroundColor: theme.palette.background.paper, 
              boxShadow: theme.shadows[1],
            }}
          >
            <DateTimePicker
              label="Start Date and Time"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
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
                },
              }}
            />
          </Box>
        </LocalizationProvider>
      )}

      {/* Chart */}
      <Paper sx={{ p: 2, backgroundColor: theme.palette.background.paper }}>
        <Chart data={filteredData} />
      </Paper>
    </Box>
  );
};

export default Home;
