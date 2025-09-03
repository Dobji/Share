@echo off
echo Initializing Construction Company Database...
echo.

echo Installing Python dependencies...
cd backend
pip install -r requirements.txt

echo.
echo Initializing database with sample data...
python init_db.py

echo.
echo Database initialization completed!
echo You can now start the application using start.bat
echo.
pause 