
# 🏠 Smart Home Automation & Security System with IoT and Machine Learning

## 🌟 Overview
This project showcases a **low-cost, energy-efficient IoT-based home automation and security system** using an **ESP8266** microcontroller, multiple sensors, and **machine learning** for anomaly detection. The system is designed to monitor and control home appliances while providing real-time data on the environment, enhancing security, and optimizing energy use.

The project includes:
- Multiple sensors (motion, temperature, humidity, door, window, smoke detector)
- Appliance control (lights, fans, etc.)
- Data logging in a SQL database
- React and React Native apps for real-time monitoring and control
- Machine learning-based anomaly detection for smarter automation

## 🚀 Features
- **Security Monitoring**: Detects motion, open windows/doors, and potential security breaches.
- **Environmental Monitoring**: Monitors temperature, humidity, and air quality, triggering alerts or actions when thresholds are exceeded.
- **Appliance Control**: Automate and remotely control lights, fans, or other devices.
- **Machine Learning**: Basic anomaly detection to predict unusual behaviors based on sensor data (e.g., temperature spikes, motion anomalies).
- **Real-Time Monitoring**: Web and mobile apps provide insight into the current status of your home.
- **Energy Efficiency**: Designed to reduce energy consumption by automating home systems based on sensor input.

## 🛠️ Technologies Used
### Hardware
- **ESP8266** (or ESP32 for advanced features)
- Simulated sensors via **Wokwi**:
  - Motion sensor
  - Temperature and humidity sensor
  - Door/window sensor
  - Smoke detector

### Software
- **Back-End**: Python (Flask/FastAPI) for handling sensor data and running the machine learning model.
- **Database**: SQL (MySQL or PostgreSQL) for storing sensor logs and predictions.
- **Front-End**:
  - **Web App**: Built using React.js for real-time data visualization and control.
  - **Mobile App**: React Native for cross-platform control on iOS and Android.
- **Machine Learning**: TensorFlow for anomaly detection based on sensor data.

## ⚙️ Setup and Installation
### Prerequisites
To run the project locally, you’ll need the following installed:
- **Python 3.x** (for back-end server)
- **Node.js & npm** (for front-end React and React Native apps)
- **MySQL or PostgreSQL** (for database)
- **Wokwi** or other IoT simulation platform

### Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/AllMightyyyy/EndCycleProject.git
   cd EndCycleProject
   ```

2. **Back-End Setup**
   - Navigate to the back-end folder:
     ```bash
     cd backend
     ```
   - Install the required Python packages:
     ```bash
     pip install -r requirements.txt
     ```
   - Set up the database and run migrations (example for Flask and SQLAlchemy):
     ```bash
     flask db upgrade
     ```
   - Run the server:
     ```bash
     python app.py
     ```

3. **Front-End Setup (Web App)**
   - Navigate to the front-end folder:
     ```bash
     cd frontend
     ```
   - Install the necessary packages:
     ```bash
     npm install
     ```
   - Start the web app:
     ```bash
     npm start
     ```

4. **Mobile App Setup (React Native)**
   - Navigate to the mobile folder:
     ```bash
     cd mobile
     ```
   - Install the necessary dependencies:
     ```bash
     npm install
     ```
   - Run the app in an emulator or on a device:
     ```bash
     npx react-native run-android # For Android
     npx react-native run-ios # For iOS
     ```

5. **Wokwi Simulation**
   - Import the provided **ESP8266 simulation project** from the `/simulation` folder into Wokwi.
   - Run the simulation and verify data being sent to the server.

## 🧠 Machine Learning (Anomaly Detection)
- The ML model is trained using the sensor data (temperature, humidity, motion, etc.).
- The model is implemented using TensorFlow and runs on the back-end server to predict anomalies (e.g., temperature spikes, unexpected motion).
- See the `/ml_model` directory for the model code and dataset.

## 📁 Project Structure
```plaintext
📦 EndCycleProject
├── 📁 backend          # Python code for server and data management
├── 📁 frontend         # React.js code for web app
├── 📁 mobile           # React Native code for mobile app
├── 📁 ml_model         # TensorFlow model and training data
├── 📁 simulation       # Wokwi simulation files
├── 📁 notes            # Project notes
├── 📁 mockData         # Mock placeholder data
└── README.md           # Project overview
```

## 📊 Database Schema
The following is a simplified schema for storing sensor data and predictions:
- **Sensors Table**: Contains information about each sensor (e.g., type, location).
- **Logs Table**: Stores the data sent by sensors (e.g., temperature, motion).
- **Anomalies Table**: Stores predicted anomalies based on machine learning.

## 📦 Deployment (Optional)
If you plan to deploy this project, follow these steps:
1. Set up a cloud server (AWS, Heroku, etc.) and configure your back-end API.
2. Connect the database to your cloud server.
3. Deploy the front-end web app using a service like **Netlify** or **Vercel**.
4. Configure mobile apps to connect to the live server and database.

## 📝 Documentation
Detailed project documentation is available [here](link-to-documentation). It includes:
- Full technical details
- Code walkthroughs
- API reference
- Simulation setup guide

## 🤝 Contributing
Contributions are welcome! Please submit a pull request or open an issue for any bug reports or feature requests.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact
For questions or support, please contact me at:
- **Email**: zakariafarih142@gmail.com
- **GitHub**: [AllMightyyyy](https://github.com/AllMightyyyy)
