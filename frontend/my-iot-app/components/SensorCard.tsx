import { Card, CardContent, Typography } from '@mui/material';
import { SensorData } from '@/types/SensorData';

interface SensorCardProps {
  sensor: SensorData;
}

const SensorCard: React.FC<SensorCardProps> = ({ sensor }) => {
  return (
    <Card style={{ marginBottom: '16px' }}>
      <CardContent>
        <Typography variant="h5">{sensor.name}</Typography>
        <Typography>Motion: {sensor.motion === 'detected' ? 'Detected' : 'None'}</Typography>
        <Typography>Temperature: {sensor.temperature} °C</Typography>
        <Typography>Humidity: {sensor.humidity} %</Typography>
        <Typography>Timestamp: {sensor.timestamp}</Typography>
        <Typography>Light Intensity: {sensor.ldr}</Typography>
      </CardContent>
    </Card>
  );
};

export default SensorCard;