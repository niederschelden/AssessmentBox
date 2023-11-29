## Installation
# Voaraussetzung ist ein vorhandenes ESP8266 Modul
### Schritt 1: Arduino IDE herunterladen und installieren
1. Laden Sie die Arduino IDE von [https://www.arduino.cc/en/software](https://www.arduino.cc/en/software) herunter.
2. Installieren Sie die IDE auf Ihrem Computer gemäß den Anweisungen für Ihr Betriebssystem.

### Schritt 2: ESP8266 Board-Unterstützung hinzufügen
1. Öffnen Sie die Arduino IDE.
2. Gehen Sie zu Datei > Voreinstellungen (oder Arduino > Voreinstellungen auf einem Mac).
3. Fügen Sie im Feld "Zusätzliche Boardverwalter-URLs" folgende URL ein: `http://arduino.esp8266.com/stable/package_esp8266com_index.json`.
4. Klicken Sie auf OK.
5. Gehen Sie zu Werkzeuge > Board > Boards Manager...
6. Suchen Sie nach "ESP8266" und installieren Sie das Paket von "ESP8266 Community".

### Schritt 3: SPIFFS-Dateisystem-Tool installieren
1. Laden Sie das SPIFFS-Tool für Ihre Arduino-Version und Ihr Betriebssystem von [https://github.com/esp8266/arduino-esp8266fs-plugin](https://github.com/esp8266/arduino-esp8266fs-plugin) herunter.
2. Entpacken Sie das heruntergeladene Archiv.
3. Verschieben Sie den entpackten Ordner in den `tools`-Ordner Ihres Arduino-Sketchbook-Verzeichnisses. Falls der `tools`-Ordner nicht existiert, erstellen Sie ihn.

### Schritt 4: SSID und Passwort ändern
1. Öffnen Sie die include Datei AssessmentBox/wlanPWD_default.h mit einem Editor.
2. Ändern Sie die Werte für SSID und Passwort im Sketch auf Ihre Zugangsdaten im lokalen WLAN.
3. Speichern Sie die Datei unter AssessmentBox/wlanPWD.h

### Schritt 5: Daten und Sketch auf den ESP8266 hochladen
1. Laden Sie die benötigten Daten (HTML/JavaScript-Dateien) in den SPIFFS-Ordner Ihres Projekts.
2. Verbinden Sie den ESP8266 mit Ihrem Computer über ein USB-Kabel.
3. Öffnen Sie die Arduino IDE und wählen Sie Ihr ESP8266-Board unter `Werkzeuge > Board` aus.
4. Wählen Sie den richtigen COM-Port unter `Werkzeuge > Port`.
5. Hochladen der Daten auf den ESP8266:
   - Gehen Sie zu `Werkzeuge > ESP8266 Sketch Data Upload`. Dies wird alle Dateien aus dem SPIFFS-Ordner auf den ESP8266 hochladen.
   - Warten Sie, bis der Upload-Prozess abgeschlossen ist. Dies kann einige Minuten dauern, abhängig von der Größe der Daten.

### Schritt 6: Sketch hochladen
1. Öffnen Sie den Arduino-Sketch für die Assesment Box in der Arduino IDE.
2. Achtung: WLAN Daten richtig geändert? Siehe Punkt 4.
3. Klicken Sie auf `Werkzeuge > Hochladen`, um den Sketch auf Ihren ESP8266 zu übertragen.
4. Warten Sie, bis der Upload-Prozess abgeschlossen ist. Die IDE zeigt eine Nachricht an, wenn der Upload erfolgreich war.

### Schritt 7: Überprüfung und Inbetriebnahme
1. **Stromversorgung anschließen**: Trennen Sie nach erfolgreichem Upload den ESP8266 von Ihrem Computer und schließen Sie ihn an eine Stromquelle an. Während der Verbindungsversuche blinkt die LED auf der Box.
   
2. **Verbindung überprüfen**:
   - **Erfolgreiche Verbindung**: Wenn die LED innerhalb der ersten Minuten erlischt, zeigt dies eine erfolgreiche Verbindung an.
   - **Verbindungsprobleme**: Eine dauerhaft leuchtende LED weist auf ein Verbindungsproblem hin. Überprüfen Sie, ob Sie die WLAN-Daten korrekt eingegeben haben.
   - **Keine Verbindung**: Wenn es dauerhaft zu keiner Verbindung kommt, schaltet sich der ESP8266 in den Tiefschlafmodus, was dazu führt, dass die LED ebenfalls ausgeht.

3. **Seriellen Monitor verwenden**: Bei anhaltenden Verbindungsproblemen kann der serielle Monitor der Arduino IDE genutzt werden, um den Verbindungsprozess zu verfolgen und mögliche Fehler zu identifizieren.

4. **Zugriff auf die Assesment Box**:
   - Versuchen Sie, auf die Assesment Box über die Adresse `http://assessment` in Ihrem Webbrowser zuzugreifen.
   - Falls dies nicht funktioniert, müssen Sie möglicherweise im Router-Menü die IP-Adresse des ESP8266 suchen und diese direkt in Ihrem Browser eingeben.

5. **Funktionsprüfung**: Überprüfen Sie, ob alle Funktionen der Assesment Box wie erwartet funktionieren.

---
Diese Installationsanleitung soll Ihnen helfen, die Assesmaent Box schnell und effizient einzurichten.
