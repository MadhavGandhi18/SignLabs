# SignLapse YouTube Extension

This browser extension adds sign language translation capabilities to YouTube videos.

## Features

- Translates spoken content in videos to sign language
- Overlays sign language interpretation on YouTube videos
- Customizable display options

## Installation

### Chrome/Edge Installation

1. Open Chrome/Edge browser
2. Go to Extensions management page (chrome://extensions or edge://extensions)
3. Enable "Developer mode" (toggle in the top-right corner)
4. Click "Load unpacked"
5. Select the `youtube extension` folder from this repository

### Firefox Installation

1. Open Firefox browser
2. Go to `about:debugging`
3. Click "This Firefox"
4. Click "Load Temporary Add-on"
5. Select the `manifest.json` file from the `youtube extension` folder

## Usage

1. Navigate to any YouTube video
2. Click on the SignLapse extension icon in your browser
3. Use the popup controls to enable sign language translation
4. Adjust settings as needed through the extension popup

## Development

The extension consists of:
- `manifest.json` - Extension configuration
- `content.js` - Content script injected into YouTube pages
- `popup.html/js` - Extension popup interface
- `background.js` - Background script for extension functionality
- `sign_words/` - Sign language animation assets

### Requirements

For Python components:
```
pip install -r requirements.txt
``` 