#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <FS.h> // Für das Dateisystem
#include <Ticker.h>

// WLAN-Zugangsdaten
#include "wlanPWD.h"

// WLAN überwachung
Ticker wifiChecker;
volatile bool needToReconnect = false;
volatile byte reconnectAttempts = 0; // Neue Variable für die Zählung der Versuche
#define maxAttempts 5

//LED Pin
const int ledPin = 2; // GPIO2, D4 auf einigen Boards

ESP8266WebServer server(80);

void connectToWiFi(bool wait) {
  const int timeoutMs = 20000; // 20 Sekunden Timeout
  unsigned long startAttemptTime = millis();
  WiFi.hostname("assessment");
  WiFi.begin(ssid, password);
  Serial.println("Verbindung zu WLAN wird hergestellt...");

  if(wait) {
    while (WiFi.status() != WL_CONNECTED && millis() - startAttemptTime < timeoutMs) {
      delay(500);
      digitalWrite(ledPin, !digitalRead(ledPin)); // LED Zustand umschalten
      Serial.print(".");
    }
    if (WiFi.status() != WL_CONNECTED) {
      Serial.println("\nFehler: Verbindung zu WLAN konnte nicht hergestellt werden.");
      digitalWrite(ledPin, LOW); // LED Zustand umschalten
    } else {
      Serial.println("\nWLAN verbunden");
      Serial.print("IP-Adresse: ");
      Serial.println(WiFi.localIP());
      digitalWrite(ledPin, HIGH); // LED Zustand umschalten
    }
  }
}

void checkWiFiConnection() {
  if (WiFi.status() != WL_CONNECTED) {
    reconnectAttempts++;
    needToReconnect = true;
    digitalWrite(ledPin, LOW); // LED einschalten, wenn keine Verbindung besteht
    Serial.println("Verbindung nicht vorhanden.");

    if (reconnectAttempts >= maxAttempts) {
      needToReconnect = false;
      Serial.println("Maximale Anzahl an Verbindungsversuchen erreicht. Gehe in Deep Sleep.");
      ESP.deepSleep(0); // Gehe in Deep Sleep und erwache nicht, bis Reset gedrückt wird
    }
  } else {
    reconnectAttempts = 0; // Setze die Anzahl der Versuche zurück, wenn verbunden
    needToReconnect = false;
    digitalWrite(ledPin, HIGH); // LED ausschalten, wenn Verbindung besteht
    Serial.println("Verbindung vorhanden.");
  }
}

void setup() {
  //das eine Debugging
  Serial.begin(115200);
  delay(100);
  while (!Serial) {
    delay(50); // Warten auf die Initialisierung der seriellen Verbindung
  }
  
  //das andere Debugging
  pinMode(ledPin, OUTPUT);
  
  // Starten des Dateisystems
  SPIFFS.begin();

  // Verbindung zum WLAN-Netzwerk herstellen
  connectToWiFi(true);
  // Verbindung alle 30 Sekunden validieren
  wifiChecker.attach(30, checkWiFiConnection);
  
  // Definieren der URL-Handler
  server.on("/", handleRoot); // Handler für die Root-URL
  server.onNotFound(handleNotFound); // Handler für alle anderen URLs

  // Starten des Servers
  server.begin();
  Serial.println("HTTP server started");
}


void loop() {
  //Prüfe netzwerk
  if (needToReconnect) {
    needToReconnect = false;
    connectToWiFi(true);
  }
  // Bearbeitung der eingehenden Anfragen
  server.handleClient();
}

void handleRoot() {
  // Sendet die index.html Datei, wenn die Root-URL aufgerufen wird
  sendFile("/index.html");
}

void handleNotFound() {
  // Extrahiert den Pfad aus der URL und versucht, die entsprechende Datei zu senden
  String path = server.uri();
  sendFile(path);
}

void sendFile(String path) {
  // Öffnen der Datei aus dem Dateisystem (SPIFFS)
  File file = SPIFFS.open(path, "r");
  if (!file) {
    // Senden einer 404-Seite, falls die Datei nicht gefunden wurde
    server.send(404, "text/plain", "404: Not Found");
    return;
  }

  // Senden der Datei
  server.streamFile(file, getContentType(path));
  file.close();
}

String getContentType(String filename) {
  // Bestimmung des Content-Types basierend auf der Dateiendung
  if (filename.endsWith(".html")) return "text/html";
  else if (filename.endsWith(".css")) return "text/css";
  else if (filename.endsWith(".js")) return "application/javascript";
  else if (filename.endsWith(".png")) return "image/png";
  else if (filename.endsWith(".jpg")) return "image/jpeg";
  else if (filename.endsWith(".gif")) return "image/gif";
  else if (filename.endsWith(".mp3")) return "audio/mpeg";
  else if (filename.endsWith(".ico")) return "image/x-icon";
  return "text/plain";
}
