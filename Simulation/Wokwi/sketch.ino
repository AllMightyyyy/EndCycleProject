#include <WiFi.h>
#include <HTTPClient.h>
#include <Wire.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include <esp_task_wdt.h>  

// Pin Definitions
#define LED_PIN 13        
#define PIR_PIN 15        
#define BUZZER_PIN 14    
#define DHT_PIN 13       

// OLED Display
#define SCREEN_WIDTH 128  
#define SCREEN_HEIGHT 64  
#define OLED_RESET -1     

// DHT Sensor
#define DHT_TYPE DHT22   
DHT dht(DHT_PIN, DHT_TYPE);

// WiFi and Server Details
const char* ssid = "Wokwi-GUEST";        
const char* password = ""; 
const char* serverUrl = "https://esp8266-cf2819a51709.herokuapp.com/motion";  

// OLED Display Object
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// Variables
int pirstate = LOW; 
int value = 0;       
float lastTemp = -100;  // To track previous temperature value
float lastHumidity = -100;

// Timing Variables for non-blocking delays
unsigned long previousMillis = 0;
const long interval = 500;  // Interval for the loop (500 ms)

// Function Prototypes
void connectToWiFi();
void displayMotionStatus(String status);
void displayTempHumidity(float temp, float humidity);
void sendMotionData(float temp, float humidity);
void checkForSleep();

void setup() {
  pinMode(LED_PIN, OUTPUT);   
  pinMode(PIR_PIN, INPUT);     
  pinMode(BUZZER_PIN, OUTPUT); 
  
  Serial.begin(115200);      

  // OLED initialization
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println("SSD1306 allocation failed");
    for (;;); // Stop execution
  }

  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.print("Initializing...");
  display.display();

  // DHT sensor initialization
  dht.begin();

  // Connect to WiFi
  connectToWiFi();

  // Initialize Watchdog Timer (WDT)
  esp_task_wdt_init(5, true);  // 5 seconds timeout
  esp_task_wdt_add(NULL);      // Add current thread to WDT
}

void loop() {
  esp_task_wdt_reset();  // Reset WDT at the beginning of each loop

  unsigned long currentMillis = millis();
  
  // Non-blocking loop, run only if interval has passed
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;  // Save the last time the loop ran

    value = digitalRead(PIR_PIN);  // Read PIR sensor
    float temperature = dht.readTemperature();  // Read temperature
    float humidity = dht.readHumidity();        // Read humidity

    // Check if readings from DHT sensor failed
    if (isnan(temperature) || isnan(humidity)) {
      Serial.println("Failed to read from DHT sensor!");
      temperature = 0.0;  // Fallback values
      humidity = 0.0;
    } else {
      Serial.print("Temperature: ");
      Serial.print(temperature);
      Serial.println(" C");
      
      Serial.print("Humidity: ");
      Serial.print(humidity);
      Serial.println(" %");
    }

    // Motion detected
    if (value == HIGH) {        
      digitalWrite(LED_PIN, HIGH);   // Turn on LED
      digitalWrite(BUZZER_PIN, HIGH);  // Turn on Buzzer
      displayMotionStatus("Motion Detected");
      displayTempHumidity(temperature, humidity);

      if (pirstate == LOW) {  // Motion was previously off
        Serial.println("Motion detected!");
        sendMotionData(temperature, humidity);  // Send data to server
        pirstate = HIGH;   // Update motion state
      }
    } else {  // No motion detected
      digitalWrite(LED_PIN, LOW);    // Turn off LED
      digitalWrite(BUZZER_PIN, LOW); // Turn off Buzzer
      displayMotionStatus("No Motion");
      displayTempHumidity(temperature, humidity);

      if (pirstate == HIGH) {  // Motion just ended
        Serial.println("Motion ended!");
        pirstate = LOW;    
      }
    }

    // Check if the device should go to deep sleep
    checkForSleep();
  }
}

// Display motion status on OLED
void displayMotionStatus(String status) {
  display.clearDisplay();
  display.setCursor(0, 0);
  display.print(status);
  display.display();
}

// Display temperature and humidity on OLED, only if values change
void displayTempHumidity(float temp, float humidity) {
  if (temp != lastTemp || humidity != lastHumidity) {
    display.setCursor(0, 20);
    display.print("Temp: ");
    display.print(temp);
    display.print(" C");
    display.setCursor(0, 30);
    display.print("Humidity: ");
    display.print(humidity);
    display.print(" %");
    display.display();

    lastTemp = temp;
    lastHumidity = humidity;
  }
}

// Send motion data (temperature and humidity) to server via HTTP POST
void sendMotionData(float temp, float humidity) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);  
    http.addHeader("Content-Type", "application/json");

    String requestData = "{\"motion\":\"detected\", \"temperature\":\"" + String(temp) + "\", \"humidity\":\"" + String(humidity) + "\"}";
    int httpResponseCode = http.POST(requestData); 

    if (httpResponseCode > 0) {
      Serial.print("HTTP Response: ");
      Serial.println(httpResponseCode);
    } else {
      Serial.println("Error sending POST request");
    }

    http.end();  // Free resources
  }
}

// Connect to WiFi with a non-blocking connection check
void connectToWiFi() {
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi...");
  
  unsigned long startAttemptTime = millis();  // Record the time the connection attempt started
  
  // Non-blocking connection check with a timeout (e.g., 10 seconds)
  while (WiFi.status() != WL_CONNECTED && millis() - startAttemptTime < 10000) {
    Serial.print(".");
    delay(500);  // Brief delay for logging feedback
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("Connected!");
    displayMotionStatus("Connected to WiFi");
  } else {
    Serial.println("WiFi Connection Failed");
    displayMotionStatus("WiFi Connection Failed");
  }
}

// Check for inactivity and go into deep sleep if no motion is detected
void checkForSleep() {
  if (pirstate == LOW) {
    ESP.deepSleep(300e6);  // Go into deep sleep for 5 minutes (300e6 µs)
  }
}
