# Credit Card Validator Backend

This project is a Node.js backend application that validates credit card numbers using the Luhn Algorithm and implements JWT tokens for user authentication.

## Features

- Validates credit card numbers using the Luhn Algorithm.
- Suggests the missing digit for incomplete credit card numbers.
- Secures routes with JWT authentication.

## Technologies Used

- Node.js
- Express.js
- JSON Web Tokens (JWT)

## Project Structure

```
credit-card-validator-backend
├── src
│   ├── app.js
│   ├── controllers
│   │   └── creditCardController.js
│   ├── middleware
│   │   └── auth.js
│   ├── routes
│   │   └── creditCardRoutes.js
│   ├── utils
│   │   └── luhn.js
│   └── config
│       └── jwtConfig.js
├── package.json
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd credit-card-validator-backend
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Start the server:
   ```
   npm start
   ```
2. The server will run on `http://localhost:3000`.

## API Endpoints

- **POST /validate**: Validates a credit card number.
  - Request Body: 
    ```json
    {
      "cardNumber": "string"
    }
    ```
  - Response: 
    ```json
    {
      "valid": true/false,
      "message": "string"
    }
    ```

- **POST /suggest**: Suggests the missing digit for a credit card number that is one digit short.
  - Request Body: 
    ```json
    {
      "cardNumber": "string"
    }
    ```
  - Response: 
    ```json
    {
      "suggestedDigit": "number"
    }
    ```

## Authentication

To access protected routes, include a JWT token in the Authorization header of your requests.

## License

This project is licensed under the MIT License.