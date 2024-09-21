declare module 'react-animated-weather' {
    interface ReactAnimatedWeatherProps {
      icon: 'CLEAR_DAY' | 'CLEAR_NIGHT' | 'PARTLY_CLOUDY_DAY' | 'PARTLY_CLOUDY_NIGHT' | 'CLOUDY' | 'RAIN' | 'SLEET' | 'SNOW' | 'WIND' | 'FOG';
      color?: string;
      size?: number;
      animate?: boolean;
    }
  
    const ReactAnimatedWeather: React.FC<ReactAnimatedWeatherProps>;
  
    export default ReactAnimatedWeather;
  }
  