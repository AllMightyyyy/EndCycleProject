import os
import logging
import requests  # For weather API
from flask import Flask, request, abort, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime, timedelta
from config import Config
import atexit
from apscheduler.schedulers.background import BackgroundScheduler

# Initialize logging
logging.basicConfig(level=logging.INFO)

# Initialize the database variable
db = SQLAlchemy()

# Define the MotionEvent model
class MotionEvent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    motion = db.Column(db.String(50), nullable=False)
    temperature = db.Column(db.Float, nullable=True)
    humidity = db.Column(db.Float, nullable=True)
    ldr_value = db.Column(db.Integer, nullable=True)
    weather = db.Column(db.String, nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

# Define the WeatherData model to store daily weather data
class WeatherData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False, unique=True)
    weather_info = db.Column(db.String, nullable=False)

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Load configurations from config.py
    app.config.from_object(Config)

    # Initialize the app with the database
    db.init_app(app)

    # Create the tables when the app starts
    with app.app_context():
        db.create_all()

    @app.route('/motion', methods=['POST'])
    def motion_detected():
        # Check if the request contains the correct API key
        api_key = request.headers.get('X-API-KEY')
        if api_key != Config.API_KEY:
            abort(403, description="Unauthorized access")

        data = request.json
        if not data or 'motion' not in data:
            abort(400, description="Missing or invalid motion data")

        # Get sensor data
        motion_status = data['motion']
        temperature = data.get('temperature', None)
        humidity = data.get('humidity', None)
        ldr_value = data.get('ldr', None)

        logging.info(f"Motion: {motion_status}, Temp: {temperature}, Humidity: {humidity}, LDR: {ldr_value}")

        # Get weather data for today
        weather_data = get_weather_data_for_today()

        # Log the event in the database
        event = MotionEvent(
            motion=motion_status,
            temperature=temperature,
            humidity=humidity,
            ldr_value=ldr_value,
            weather=weather_data
        )
        db.session.add(event)
        db.session.commit()

        return jsonify({"message": "Data logged", "weather": weather_data}), 200

    def get_weather_data_for_today():
        # Check if weather data for today is already in the database
        today = datetime.utcnow().date()
        cached_weather = WeatherData.query.filter_by(date=today).first()

        if cached_weather:
            return cached_weather.weather_info

        # If not in cache, fetch the weather data from the API
        weather_info = fetch_weather_data_from_api()

        # Store the weather data in the database
        new_weather_data = WeatherData(date=today, weather_info=weather_info)
        db.session.add(new_weather_data)
        db.session.commit()

        return weather_info

    def fetch_weather_data_from_api():
        try:
            if not Config.WEATHER_API_KEY:
                logging.warning("No Weather API key found.")
                return "No weather data available"

            lat = Config.DEVICE_LATITUDE
            lon = Config.DEVICE_LONGITUDE
            weather_url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={Config.WEATHER_API_KEY}&units=metric"
            
            response = requests.get(weather_url)
            if response.status_code == 200:
                weather_info = response.json()
                main = weather_info['weather'][0]['main']
                description = weather_info['weather'][0]['description']
                temp = weather_info['main']['temp']
                return f"{main}, {description}, Temp: {temp}°C"
            else:
                logging.error("Failed to fetch weather data.")
                return "Failed to fetch weather data"
        except Exception as e:
            logging.error(f"Error fetching weather data: {str(e)}")
            return "Error fetching weather data"

    # Scheduler to fetch weather data every 24 hours
    def scheduled_weather_update():
        today = datetime.utcnow().date()
        existing_data = WeatherData.query.filter_by(date=today).first()

        if not existing_data:
            weather_info = fetch_weather_data_from_api()
            new_weather = WeatherData(date=today, weather_info=weather_info)
            db.session.add(new_weather)
            db.session.commit()
            logging.info(f"Weather data updated for {today}: {weather_info}")
        else:
            logging.info(f"Weather data for {today} already exists.")

    scheduler = BackgroundScheduler()
    scheduler.add_job(scheduled_weather_update, 'interval', hours=24, next_run_time=datetime.utcnow())
    scheduler.start()

    # Shut down the scheduler when exiting the app
    atexit.register(lambda: scheduler.shutdown())

    return app

if __name__ == '__main__':
    app = create_app()
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=False, host='0.0.0.0', port=port)
