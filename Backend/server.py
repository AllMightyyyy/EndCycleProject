import os
import logging
from flask import Flask, request, abort
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
from config import Config

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
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

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

        motion_status = data['motion']
        temperature = data.get('temperature', None)
        humidity = data.get('humidity', None)

        logging.info(f"Motion: {motion_status}, Temp: {temperature}, Humidity: {humidity}")

        # Log the event in the database
        event = MotionEvent(
            motion=motion_status,
            temperature=temperature,
            humidity=humidity
        )
        db.session.add(event)
        db.session.commit()

        return "Data logged", 200

    return app

if __name__ == '__main__':
    app = create_app()
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=False, host='0.0.0.0', port=port)
