# PoCAMon -- Das Ratespiel, das Pokémon-Karten mit der digitalen Welt vereint


## Inhalt:

  - [Spielprinzip](#spielprinzip)
  - [Wie man das Spiel lokal startet](#wie-man-das-spiel-lokal-startet)
  - [Ein Blick hinter die Kulissen: Dokumentation unseres Datenverarbeitungsprozesses](#ein-blick-hinter-die-kulissen-dokumentation-unseres-datenverarbeitungsprozesses)
    - [Download und Zusammenstellung unseres Datensatzes](#download-und-zusammenstellung-unseres-datensatzes)
    - [Annitation und Preprocessing](#annitation-und-preprocessing)
    - [Training des Modells](#training-des-modells)



## Spielprinzip

Können Sie erraten, um welches Pokémon es sich handelt? Bei PoCAMon werden Ihnen auf einem virtuellen Pokédex Informationen über ein zufällig ausgewähltes Pokémon angezeigt, anhand denen Spieler das gesuchte Pokémon erraten und eine passende Pokémon-Karte in ihre Webcam halten müssen. Wurde das richtige Pokémon auf dem Webcam-Feed erkannt, geht es weiter mit dem nächsten Pokémon. 

TODO *Screenshot hier einfügen*

Mit der Zeit werden dem Spieler mehr Hinweise zur Verfügung gestellt, welche er sich über den "Hint" Knopf auf seinen Pokédex laden kann. Darunter befinden sich die Größe und Farbe des gesuchten Pokémon, dessen Typ(en), Pokédex-Eintrag, Ruf (als abspielbaren Sound) und seine Silhouette.

Das Ziel ist es, das gesuchte Pokémon mit möglichst wenigen Hinweisen zu erraten.


## Wie man das Spiel lokal startet

Für PoCAMon stehen derzeit keine plattformspezifischen Builds bereit, daher muss das Spiel direkt über Python gestartet werden:

0. Falls Sie dies noch nicht getan haben, klonen Sie dieses GitLab Repository mit dem Befehl `git clone https://gitlab.hs-anhalt.de/stjtschw/whoami-kilnw.git` und navigieren Sie in den "Server" Ordner innerhalb des Repositories (`cd whoami-kilnw/Server/`).
1. optional aber empfohlenerweise setzen Sie ein virtuelles Python-Environment im "Server" Ordner auf (`python -m venv venv`)
2. Installieren Sie die benötigten Pakete mit dem Befehl `pip install -r requirements.txt`
3. Starten Sie den Webserver mit dem Befehl `flask run`
4. Öffnen Sie im Browser Ihrer Wahl die Adresse http://localhost:5000 und spielen Sie drauf los


## Ein Blick hinter die Kulissen: Dokumentation unseres Datenverarbeitungsprozesses

### Download und Zusammenstellung unseres Datensatzes
TODO: Justin erklärt Scraper 

### Annitation und Preprocessing

### Training des Modells

Zum Training und zur Anwendung unseres Modells haben wir uns für die Python-Bibliothek [yolov5](https://github.com/ultralytics/yolov5) entschieden.