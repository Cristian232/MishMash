@echo off
PowerShell -Command "Start-Process npm -ArgumentList 'run installService' -Verb RunAs"
