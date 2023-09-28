# Venue Explorer Bot

## Project Overview
Venue Explorer Bot is a Telegram Mini App that allows users to explore and find venues based on different categories. Users can view details about the venues and mark their favorite ones. The project is developed as part of Telegram's Mini App development contest and serves as a reusable example for future Mini App developers.

### Features
- Explore venues by category
- View detailed information about each venue
- Mark venues as favorites

## Installation

### Prerequisites
- Node.js installed (version xx or above)
- Telegram App installed on your device

### Backend Setup
```bash
cd backend
npm install
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

#### Deployment Configuration (vercel.json)
When deploying to Vercel, a `vercel.json` configuration file is used to manage the routing behaviors and other deployment settings for the project.

The provided configuration in this project primarily ensures that the SPA routes correctly, addressing a known issue where reloading on a subroute would result in a 404 error.

The configuration contains rules for handling asset requests (such as images, stylesheets, and scripts), directing them to their corresponding resources, and any other path is directed to the `index.html` file, allowing the React router to handle the route client-side. This resolves the reloading error on subroutes by always serving the `index.html` on any path and can influence performance due to client-side routing and handling.

## Usage

### User Guide
todo

### Developer Guide
todo

### Technology Stack
- Backend: Node.js
- Frontend: React, Lottie Web
- Libraries: [List other libraries/frameworks]
- Hosting: [Vercel]

### Contributing
Whether it's improving code quality, adding new features, or reporting bugs, contributions to this project are welcome and appreciated.

### License
This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

### Contact
You can reach out to me on [Telegram](https://t.me/victorbobkov).
