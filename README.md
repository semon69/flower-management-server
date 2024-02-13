# Flower Management Dashboard

The Flower Management Dashboard is a comprehensive web application designed for efficient Flower inventory management, sales tracking, and sales history analysis.

## Features

### Authentication

- _User Registration and Login:_
  - Users must register and log in to access the dashboard.
  - Secure authentication using JSON Web Tokens (JWT).
  - Single role: User responsible for managing the system.

### Flower Management

- _CRUD Operations:_
  - Add, delete, update, and view flowers in the inventory.
  - Robust filtering system for effective flower selections.

### Sales Management

- _Sell Products:_
  - Users can search for a flower and initiate a sale.
  - Sale form includes fields for quantity, buyer name, and date.
  - Removal of product from inventory when quantity reaches zero.

### Sales History

- _Categorized View:_
  - Sales history categorized by Weekly, Daily, Monthly, Yearly.

### Flowers Filtering

- _Comprehensive Filters:_
  - Filter by Price, Bloom Date, Color, Type, Size, Fragrance.
  - Real-time search for Flowers name.
  - Additional parameters such as Season, Popularity.

## Installation

1. _Clone the repository:_

   git clone https://github.com/Porgramming-Hero-web-course/l2b2-full-stack-a5-server-side-semon69.git

   cd _folder name_

2. _Install Dependencies:_

   npm install

3. _Start the Application:_

   npm run start:dev

4. _Open in Browser:_

   http://localhost:5000

## Dependencies

- _JWT:_ JSON Web Tokens for secure authentication. More information can be found on the [JWT official website](https://jwt.io/).

- _Express:_ A minimal and flexible Node.js web application framework.

- _Node.js:_ A JavaScript runtime built on Chrome's V8 JavaScript engine.

- _Mongoose:_ A MongoDB object modeling tool designed to work in an asynchronous environment.

- _bcrypt:_ A library for hashing passwords.

- _Other Technologies:_ Specify any other relevant technologies or libraries used in your project.

For a complete and up-to-date list of dependencies with their versions, refer to the package.json file in the project root.

## Live Demo

Visit the live demo of the Flower Management Dashboard [here](https://flower-management-five.vercel.app/). Feel free to explore the features and functionalities!
