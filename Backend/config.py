import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    API_KEY = os.getenv('API_KEY')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
