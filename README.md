# URL Shortener Project

A robust URL shortener service built with Node.js, Express, and MongoDB. Create short URLs that redirect to original long URLs with visit tracking.

## Features

- ✅ **Modern Web Interface** - Beautiful, responsive UI for creating and managing short URLs
- ✅ Create short URLs for any valid URL
- ✅ Automatic redirect to original URL
- ✅ One shortId per URL (prevents duplicates)
- ✅ Visit history tracking and analytics
- ✅ Recent links storage (localStorage)
- ✅ Copy to clipboard functionality
- ✅ Database persistence with MongoDB
- ✅ Proper error handling
- ✅ RESTful API design

## Project Structure

```
url-shortener
├── public/                    # Frontend static files
│   ├── index.html            # Main HTML page
│   ├── styles.css            # Styling
│   └── script.js             # Frontend JavaScript
├── src
│   ├── index.js              # Entry point of the application
│   ├── routes
│   │   └── urlRoutes.js      # URL routes
│   ├── controllers
│   │   └── urlController.js  # Business logic for URLs
│   ├── models
│   │   └── url.js            # URL data model
│   └── utils
│       └── shortener.js      # Utility functions
├── connect.js                # MongoDB connection helper
├── package.json              # NPM configuration
└── README.md                 # Project documentation
```

## Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```
   cd url-shortener
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Ensure MongoDB is running on your system (default: `localhost:27017`)

## Usage

1. Start the server:

   ```
   npm start
   ```

   The server will connect to MongoDB and start on port 9000.

2. **Access the web interface:**

   Open your browser and go to `http://localhost:9000` to use the URL shortener with the beautiful web interface!

3. **API endpoints** (also available programmatically):

   ### Create Short URL

   **POST** `/url`

   Request body:

   ```json
   {
     "url": "http://www.google.com"
   }
   ```

   Response (new URL):

   ```json
   {
     "id": "abc123xyz",
     "redirectUrl": "http://www.google.com"
   }
   ```

   Response (existing URL):

   ```json
   {
     "id": "abc123xyz",
     "redirectUrl": "http://www.google.com"
   }
   ```

   ### Redirect Short URL

   **GET** `/:shortId`

   Example: `http://localhost:9000/abc123xyz`

   Response: HTTP 302 redirect to the original URL

## Features Explanation

- **Web Interface**: Access the app at `http://localhost:9000` for an intuitive, modern UI
- **Recent Links**: Last 10 shortened URLs stored in browser localStorage
- **Duplicate Prevention**: Same URL always gets the same shortId
- **Visit Tracking**: Every click on a short URL is logged with timestamps
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

## Contributing

Feel free to submit issues or pull requests to improve the project.
# URL_shortner
