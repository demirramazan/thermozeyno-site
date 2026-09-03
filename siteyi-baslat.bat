@echo off
REM Bu dosyaya cift tiklayinca site http://localhost:8000 adresinde acilir.
REM Boylece YouTube videolari ve Instagram gonderileri duzgun calisir.
cd /d "%~dp0"
echo Site baslatiliyor... Tarayicida http://localhost:8000 acilacak.
start "" "http://localhost:8000"
node server.js
pause
