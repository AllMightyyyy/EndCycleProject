import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    API_KEY = os.environ.get('API_KEY', 'mysecretapikey')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    WEATHER_API_KEY = os.environ.get('WEATHER_API_KEY')

    if not WEATHER_API_KEY:
        raise ValueError("WEATHER_API_KEY environment variable is not set")

    # Coordinates for Murcia ( to change after location gathering device is added )
    DEVICE_LATITUDE = 37.9984
    DEVICE_LONGITUDE = -1.1555