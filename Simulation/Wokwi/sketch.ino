#include <WiFi.h>
#include <HTTPClient.h>
#include <Wire.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include <esp_task_wdt.h>

// Pin Definitions
#define PIR_PIN 12         // PIR sensor connected to D12
#define DHT_PIN 13         // DHT22 sensor connected to D13
#define BUZZER_PIN 14      // Buzzer connected to D14
#define RED_LED_PIN 15     // Red LED connected to D15
#define YELLOW_LED_PIN 16  // Yellow LED connected to D16
#define GREEN_LED_PIN 17   // Green LED connected to D17
#define DOOR_PIN 18        // Door sensor connected to D18
#define LDR_PIN A1         // Photoresistor connected to A1

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
int pirValue = 0;
int doorValue = 0;
int smokeValue = 0;
float temperature = 0.0;
float humidity = 0.0;
int ldrValue = 0;  // Variable to hold LDR value
const int SMOKE_THRESHOLD = 2000;  // Adjust as needed

// Timing Variables for non-blocking delays
unsigned long previousMillis = 0;
const long interval = 500;  // Interval for the loop (500 ms)

// Function Prototypes
void connectToWiFi();
void displayStatus();
void sendSensorData();
void checkForSleep();

void setup() {
  pinMode(PIR_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(RED_LED_PIN, OUTPUT);
  pinMode(YELLOW_LED_PIN, OUTPUT);
  pinMode(GREEN_LED_PIN, OUTPUT);
  pinMode(DOOR_PIN, INPUT);  // Use external pull-up resistor

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

  esp_task_wdt_config_t wdt_config = {
    .timeout_ms = 5000,  // 5 seconds timeout
    .idle_core_mask = (1 << portNUM_PROCESSORS) - 1,  // Apply WDT to all cores
    .trigger_panic = true  // Enable panic on WDT timeout
  };

  esp_err_t wdt_init = esp_task_wdt_init(&wdt_config);  // Initialize WDT with config

  if (wdt_init == ESP_OK) {
    esp_task_wdt_add(NULL);  // Add current task (loop) to the Watchdog Timer
  } else {
    Serial.println("Failed to initialize Watchdog Timer");
  }
}

void loop() {
  esp_task_wdt_reset();  // Reset WDT at the beginning of each loop

  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;  // Save the last time the loop ran

    pirValue = digitalRead(PIR_PIN);       // Read PIR sensor
    doorValue = digitalRead(DOOR_PIN);     // Read door sensor
    smokeValue = analogRead(A0);            // Read smoke sensor (0-4095)
    ldrValue = analogRead(LDR_PIN);         // Read LDR value

    temperature = dht.readTemperature();   // Read temperature
    humidity = dht.readHumidity();         // Read humidity

    // Check if readings from DHT sensor failed
    if (isnan(temperature) || isnan(humidity)) {
      Serial.println("Failed to read from DHT sensor!");
      temperature = 0.0;  // Fallback values
      humidity = 0.0;
    }

    // Handle PIR sensor
    if (pirValue == HIGH) {
      digitalWrite(RED_LED_PIN, HIGH);   // Turn on red LED
      Serial.println("Motion detected!");
    } else {
      digitalWrite(RED_LED_PIN, LOW);    // Turn off red LED
    }

    // Handle door sensor
    if (doorValue == LOW) {  // Button pressed, door closed
      digitalWrite(YELLOW_LED_PIN, HIGH); // Turn on yellow LED
      Serial.println("Door closed!");
    } else {  // Button released, door open
      digitalWrite(YELLOW_LED_PIN, LOW); // Turn off yellow LED
    }

    // Handle smoke sensor
    if (smokeValue > SMOKE_THRESHOLD) {
      digitalWrite(GREEN_LED_PIN, HIGH); // Turn on green LED
      Serial.println("Smoke detected!");
    } else {
      digitalWrite(GREEN_LED_PIN, LOW); // Turn off green LED
    }

    // Handle buzzer
    if (pirValue == HIGH || doorValue == LOW || smokeValue > SMOKE_THRESHOLD) {
      digitalWrite(BUZZER_PIN, HIGH);  // Turn on buzzer
    } else {
      digitalWrite(BUZZER_PIN, LOW);   // Turn off buzzer
    }

    // Update OLED display
    displayStatus();

    // Send data to server if any sensor is triggered
    if (pirValue == HIGH || doorValue == LOW || smokeValue > SMOKE_THRESHOLD || ldrValue < 1000) {
      sendSensorData();
    }
  }
}

// Function to display status on OLED
void displayStatus() {
  display.clearDisplay();
  display.setCursor(0, 0);

  display.print("Motion: ");
  display.println(pirValue == HIGH ? "Detected" : "None");

  display.print("Door: ");
  display.println(doorValue == LOW ? "Closed" : "Open");

  display.print("Smoke: ");
  display.println(smokeValue);

  display.print("LDR: ");
  display.println(ldrValue);

  display.print("Temp: ");
  display.print(temperature);
  display.println(" C");

  display.print("Humidity: ");
  display.print(humidity);
  display.println(" %");

  display.display();
}

// Function to send sensor data to server
void sendSensorData() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");

    String requestData = "{\"motion\":\"" + String(pirValue) +
                         "\", \"door\":\"" + String(doorValue == LOW ? 1 : 0) +
                         "\", \"smoke\":\"" + String(smokeValue) +
                         "\", \"ldr\":\"" + String(ldrValue) +
                         "\", \"temperature\":\"" + String(temperature) +
                         "\", \"humidity\":\"" + String(humidity) + "\"}";

    int httpResponseCode = http.POST(requestData);

    if (httpResponseCode > 0) {
      Serial.print("HTTP Response: ");
      Serial.println(httpResponseCode);
    } else {
      Serial.println("Error sending POST request");
    }

    http.end();  // Free resources
  } else {
    Serial.println("WiFi not connected");
  }
}

// Connect to WiFi
void connectToWiFi() {
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi...");

  unsigned long startAttemptTime = millis();  // Record the time the connection attempt started

  while (WiFi.status() != WL_CONNECTED && millis() - startAttemptTime < 10000) {
    Serial.print(".");
    delay(500);  // Brief delay for logging feedback
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("Connected!");
    display.clearDisplay();
    display.setCursor(0, 0);
    display.print("Connected to WiFi");
    display.display();
  } else {
    Serial.println("WiFi Connection Failed");
    display.clearDisplay();
    display.setCursor(0, 0);
    display.print("WiFi Connection Failed");
    display.display();
  }
}

// Optional: Function to enter deep sleep
void checkForSleep() {
  // Implement sleep logic if necessary
}
