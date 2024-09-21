'use client';

import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import ReactAnimatedWeather from 'react-animated-weather';
import { Thermostat, Opacity } from '@mui/icons-material'; // Added Opacity icon for humidity

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const lat = 37.9984;
        const lon = -1.1555;
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

        if (!apiKey) {
          throw new Error('Weather API key is not defined.');
        }

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) throw new Error('Failed to fetch weather data');

        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  // Map OpenWeatherMap weather codes to icons
  const getWeatherIcon = (weatherMain: string) => {
    switch (weatherMain) {
      case 'Clear':
        return 'CLEAR_DAY';
      case 'Clouds':
        return 'CLOUDY';
      case 'Rain':
        return 'RAIN';
      case 'Snow':
        return 'SNOW';
      case 'Thunderstorm':
        return 'SLEET';
      case 'Drizzle':
        return 'RAIN';
      case 'Fog':
      case 'Mist':
        return 'FOG';
      default:
        return 'PARTLY_CLOUDY_DAY';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!weatherData) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
        <Typography variant="h5" color="error">Failed to load weather data.</Typography>
      </Box>
    );
  }

  const { main, weather } = weatherData;
  const weatherMain = weather[0].main;
  const weatherDescription = weather[0].description;
  const temperature = main.temp;
  const humidity = main.humidity;
  const icon = getWeatherIcon(weatherMain);

  return (
    <Box sx={{ p: 4, backgroundColor: '#031627', minHeight: '100vh', color: '#f5f5f5' }}>
      <Card
        sx={{
          background: 'linear-gradient(135deg, #031627 0%, #8fdf82 100%)',
          color: '#f5f5f5',
          borderRadius: '20px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
          p: 4,
        }}
      >
        <CardContent>
          <Typography variant="h3" align="center" gutterBottom>
            Weather Today
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', my: 4 }}>
            {/* Weather Icon */}
            <Box sx={{ textAlign: 'center' }}>
              <ReactAnimatedWeather
                icon={icon}
                color="#f5f5f5"
                size={128}
                animate={true}
              />
              <Typography variant="h4">{weatherMain}</Typography>
              <Typography variant="subtitle1">{weatherDescription}</Typography>
            </Box>

            {/* Temperature Section */}
            <Box sx={{ textAlign: 'center', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.1)' } }}>
              <Thermostat sx={{ fontSize: 128, color: '#f5f5f5' }} /> {/* Thermostat icon */}
              <Typography variant="h4">{temperature}°C</Typography>
              <Typography variant="subtitle1">Temperature</Typography>
            </Box>

            {/* Humidity Section */}
            <Box sx={{ textAlign: 'center', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.1)' } }}>
              <Opacity sx={{ fontSize: 128, color: '#f5f5f5' }} /> {/* Opacity icon for humidity */}
              <Typography variant="h4">{humidity}%</Typography>
              <Typography variant="subtitle1">Humidity</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default WeatherPage;
