# Venue Explorer Bot
![Poster Image](poster.jpg)

## Project Overview
Venue Explorer Bot is a Telegram Mini App that allows users to explore and find venues based on different categories. Users can view details about the venues and mark their favorite ones. The project is developed as part of Telegram's Mini App development contest and serves as a reusable example for future Mini App developers.

### Features
- Explore venues by category
- View detailed information about each venue
- Booking Confirmation: After selecting a venue, users can proceed to book it. The Booking Confirmation page displays the details of the booking and provides options for modification and confirmation
- Mark venues as favorites

## Installation

### Prerequisites
- Node.js: Ensure Node.js is installed. [Download Node.js](https://nodejs.org/en)
- Telegram App: Installed on your device. [Download Telegram](https://telegram.org/apps)

### Clone the repository
```bash
git clone https://github.com/victorbobkov/venue-explorer
```

### Backend Setup
Navigate to the backend directory, install the required packages, and start the server:

```bash
cd backend
npm install
npm start
```

### Frontend Setup
Similarly, for the frontend:
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
- **Exploring Venues:** On the main screen, users will be presented with various venue categories. Click on a category to explore its venues.
- **Venue Details:** Clicking on a venue will provide detailed information including its rating, amenities, and more.
- **Booking a Venue:** After exploring a venue, you can proceed to book it by clicking on the "Book Now" button. Follow through the booking process by selecting the desired options and fill in the necessary details.
- **Booking Confirmation:** Upon reaching the Booking Confirmation page, thoroughly review all your booking details to ensure accuracy. At this stage, you have the option to either modify your booking or confirm it. Once satisfied, proceed to the payment process.
- **Checkout:** Finalize your booking by proceeding to payment. Use Stripe for payment processing. For testing purposes, you can use Stripe's test cards, such as `4242 4242 4242 4242`. A comprehensive list of test cards is available [here](https://stripe.com/docs/testing#cards).
- **Favorites:** Heart icon can be clicked to mark/unmark a venue as favorite.

### Developer Guide
- **Project Structure:** The project is divided into frontend and backend directories, each containing its respective codebase.
- **State Management:** The app uses Zustand for state management. Refer to store.js in the frontend directory.
- todo: Views
- **Components:** Reusable React components are in the components directory of the frontend.
- **Mock Data and Database:**
    - The application uses SQLite for its lightweight, file-based database. The `db.js` file in the backend directory initializes the database and tables, including `venueTypes` and `venues`.
    - Mock data for the venue types and venues is defined in `constants.js`. This data is parsed and inserted into the SQLite database during initialization (see `db.js` for setup and seeding logic).
    - Ensure that changes to venue data structure in `constants.js` align with the database schema in `db.js` and vice versa.


### API Routes
**Venue Types API Endpoint**
- Endpoint: `/api/venueTypes`
- Method: GET
- Description: Retrieves information about all available venue categories.
- Response Example:
```bash
[
    { "id": 1, "type": "Apartment", "iconPath": "/assets/lotties/House.json" },
    //... other venue types
]
```

**Venue Details API Endpoint**
- Endpoint: /api/venues
- Method: GET
- Description: Retrieves detailed information about all venues.
- Response Example:
```bash
[
    {
        "id": 1,
        "name": "Urbanite High-Rise",
        "typeId": 1,
        "rating": 4.7,
        "price": 130,
        "imageUrls": ["/assets/images/1-1.jpg", "/assets/images/1-2.jpg"],
        "description": "Modern and chic, located in the heart of the city...",
        "amenities": ["Free Wi-Fi", "Kitchen"]
    },
    //... other venues
]
```

**Create Invoice API Endpoint**
- Endpoint `/api/createInvoice`
- Method: POST
- Description:
- Response Example:
```bash
{
  todo
}
```

### Database Schema 

**venueTypes Table:**
- `id` (INTEGER) - Unique identifier for each venue type.
- `type` (TEXT) - The name of the venue type.
- `iconPath` (TEXT) - Path to the associated icon.

**venues Table:**
- `id` (INTEGER) - Unique identifier for each venue.
- `name` (TEXT) - The name of the venue.
- `typeId` (INTEGER) - ID referencing the venue type.
- `rating` (REAL) - Rating score for the venue.
- `price` (INTEGER) - Price per night for the venue.
- `imageUrls` (TEXT) - JSON string containing URLs of images associated with the venue.
- `description` (TEXT) - Description of the venue.
- `amenities` (TEXT) - JSON string containing amenities offered by the venue.

Note: `imageUrls` and `amenities` are stored as JSON-encoded strings and should be parsed to JavaScript objects/arrays when queried.

### Mock Data Usage
Mock data defined in `constants.js` is utilized to seed the database with initial data for venue types and venues. This allows for consistent testing and development environments across instances of the application.
- `venueTypes`: Defines various types of venues along with their icon path.
- `venues`: Contains detailed information about venues including images, pricing, and available amenities.

To modify the mock data, simply update `constants.js` in the backend directory. Ensure any structural changes are reflected in the database schema and API responses.

###  Technology Stack
The project utilizes a comprehensive set of technologies, libraries, and frameworks to deliver a seamless user experience and maintainable codebase. Here’s a rundown of the technology stack used:

#### Backend
- **[Node.js](https://nodejs.org/):** Handles the server-side logic of the application.
- **[Express](https://expressjs.com/):** A minimal and flexible Node.js web application framework that provides robust set of features to develop web and mobile applications.
- **[SQLite3](https://www.npmjs.com/package/sqlite3):** A C library that provides a lightweight disk-based database. SQLite3 does not require a separate server process and allows access to the database using a nonstandard variant of the SQL query language.
- **[Dotenv](https://www.npmjs.com/package/dotenv):** A zero-dependency module that loads environment variables from a `.env` file into `process.env`.
- **[Node-Telegram-Bot-API](https://www.npmjs.com/package/node-telegram-bot-api):** A Node.js module to interact with the official Telegram Bot API.

#### Frontend
- **[React](https://reactjs.org/):** A JavaScript library for building user interfaces.
- **[Zustand](https://github.com/pmndrs/zustand):** A small, fast, and scalable bearbones state-management solution.
- **[Lottie-web](https://github.com/airbnb/lottie-web):** Renders Adobe After Effects animations that have been exported as JSON.
- **[React Router Dom](https://reactrouter.com/web/guides/quick-start):** The standard library for routing in React. It enables the navigation among views of various components in a React App, allows changing the browser URL, and keeps UI in sync with the URL.
- **[Date-fns](https://date-fns.org/):** Modern JavaScript date utility library.
- **[Prop-types](https://www.npmjs.com/package/prop-types):** Runtime type checking for React props and similar objects.

#### Hosting
- **[Vercel](https://vercel.com/):** Enables deployment of the frontend, providing an efficient, scalable, and intuitive cloud platform for static sites.

#### Other
- todo

### Contributing
Whether it's improving code quality, adding new features, or reporting bugs, contributions to this project are welcomed and appreciated.

### License
This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

### Contact
You can reach out to me on [Telegram](https://t.me/victorbobkov).
