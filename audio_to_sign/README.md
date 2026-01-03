# Audio to Sign

This component converts spoken audio to sign language animations.

## Setup

1. Create a virtual environment:
   ```bash
   python -m venv venv
   # On Windows
   venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Extract videos:
   The `videos.zip` file contains sign language videos needed for the application. If this file is missing:
   
   a) Download it from [Insert Share Link Here]
   b) Place it in the `audio_to_sign` directory
   c) Extract it using:
      ```bash
      # On Windows
      Expand-Archive -Path videos.zip -DestinationPath videos
      # On macOS/Linux
      unzip videos.zip -d videos
      ```

## Usage

Run the application:
```bash
python app.py
```

This will start the web server that provides sign language animation for spoken text.

## Project Structure

- `app.py` - Main Flask application
- `videos/` - Directory containing sign language video clips
- `templates/` - HTML templates for the web interface
- `requirements.txt` - Python dependencies 