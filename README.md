# EvoPo Shop

This is a fully functional single page website that allows users to browse products across various categories, perform searches, and sort products by different criteria. The application features authentication, private routes, and a user-friendly interface.

## Features

### Product Management
- **Multiple Categories**: Products are organized into various categories for easier browsing.
- **Search Functionality**: Users can search for products by name.
- **Sorting**: 
  - By Category
  - By Name
  - By Price: Low to High, High to Low
  - By Newest
- **Pagination**: Efficiently handle large product lists by paginating results.

### User Authentication
- **Sign Up / Login**: Secure user authentication with JWT.
- **Popup Login**: 
    - Google 
    - Facebook (working)
    - Twitter (working)
- **Private Routes**: Restrict access to certain pages based on user authentication.

### User Interface
- **Responsive Design**: The application is designed to be user-friendly and responsive across all devices.
- **Easy Navigation**: Users can easily navigate through categories, search for products, and use filters.

## Tech Stack

- **Frontend**: 
  - HTML, CSS, JavaScript
  - React.js for building interactive UI components
- **Backend**:
  - Node.js and Express.js for server-side logic
  - MongoDB for data storage
- **Authentication**: 
  - JWT for secure user sessions
  - Firebase Auth
- **Deployment**: Firebase

## Installation

1. **Clone the repository:**

   ```bash
   https://github.com/Sajjad-Hosan/EvoPo-Shop.git
   ```
   ```bash
   cd EvoPo-Shop
   ```
   ```bash
   npm install
   ```
   ```bash
   npm run dev 
   ```
