@echo off
title SignConnect Frontend Server
echo ========================================================
echo Starting SignConnect Frontend Development Server...
echo ========================================================
cd /d "%~dp0"
python server.py
pause

