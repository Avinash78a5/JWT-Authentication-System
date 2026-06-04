# JWT Authentication System

## Overview

This project is a full-stack authentication system built using JWT (JSON Web Tokens) with Access Tokens and Refresh Tokens. The application demonstrates a secure authentication flow where short-lived access tokens are used to access protected resources, while refresh tokens stored in HTTP-only cookies are used to generate new access tokens when they expire.

The main goal of this project was to gain hands-on experience with authentication, authorization, token management, secure cookie handling, and backend architecture using the MVC pattern.

---

## Features

* User Registration
* User Login
* JWT Authentication
* Access Token & Refresh Token Implementation
* Refresh Token stored securely in HTTP-only Cookies
* Automatic Access Token Regeneration
* Protected Routes
* User Details Retrieval
* Secure Logout Functionality
* MVC Architecture Implementation
* MongoDB Database Integration

---

## Tech Stack

### Frontend

* React
* React Router
* Axios
* Vite

### Backend

* Node.js
* Express.js
* JWT (jsonwebtoken)
* bcrypt

### Database

* MongoDB
* Mongoose

---

## Authentication Flow

### User Login

1. User enters email and password.
2. Password is verified using bcrypt.
3. Server generates:

   * Access Token (short expiry)
   * Refresh Token (long expiry)
4. Access Token is returned to the client.
5. Refresh Token is stored in an HTTP-only cookie.

### Access Protected Routes

* Client sends the Access Token in the Authorization header.
* Server verifies the token before providing protected data.

### Token Refresh

* When the Access Token expires, the frontend requests a new token using the Refresh Token.
* Server verifies the Refresh Token from the HTTP-only cookie.
* A new Access Token is generated and returned.

### Logout

* Refresh Token cookie is cleared.
* User session is terminated.

---


