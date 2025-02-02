# Anime Watchlist API
## Table of Contents
1. **Introduction** 🎙
2. **Database Design** 🗂
3. **API Endpoints** 📌
4. **Project Tools** 🛠
5. **Implementation Details** 📝
6. **Testing** 💻
7. **Documentation** 🗃
## 1. Introduction
In this final project we create a REST API, namely Anime Watchlist. Anime Watchlist API is a REST API designed to help users manage and track the anime they want to watch. The project will allow users to search for anime, view detailed information about them, and create watchlists to keep track of the anime they want to watch. The service will fetch anime data from a third-party API (Jikan API) and provide a basic set of features to manage and browse anime.

### Features Overview
- User management (register, login, profile update)
- Watchlist management (add, update, delete anime from watchlist)
- Review system
- Search history tracking

## 2. Database Design
The system database consists of 4 main tables:
### 2.1 Entity Relationship Diagram
![ERD](https://raw.githubusercontent.com/rizkim17/Databasefoto/95ef71d8c14e8e7cadda663a7c77ea83f079c5e4/anime_watchlist.drawio.png)

### 2.2 Table Descriptions
#### Users Table
```
sql

CopyCREATE TABLE users (
    id INT(11) PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(255),
    profile_picture VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```
#### Watchlist Table
```sql
SQL
CREATE TABLE watchlist (
    id INT(11) PRIMARY KEY,
    user_id INT(11),
    anime_id INT(11),
    status ENUM('plan_to_watch','watching','completed','dropped'),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```
#### Reviews Table
```sql
SQL

CopyCREATE TABLE reviews (
    id INT(11) PRIMARY KEY,
    user_id INT(11),
    anime_id INT(11),
    rating INT(11),
    content TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```
#### Search History Table
```sql
SQL

CopyCREATE TABLE search_history (
    id INT(11) PRIMARY KEY,
    user_id INT(11),
    anime_id INT(11),
    search_query VARCHAR(255),
    searched_at TIMESTAMP
);
```
## 3. API Endpoints
###  3.1 Authentication Endpoints
###   Register new user
```
POST /api/auth/register 
```
###   User login
```
POST /api/auth/login
```
### Get user profile
```
GET /api/auth/profile
```
###  Update user profile
```
PUT /api/auth/profile
```

## 3.2 Watchlist Endpoints
### Get user's watchlist
``` 
GET /api/watchlist 
```
### Add anime to watchlist
```
POST /api/watchlist 
```
### Update watchlist item
``` 
PUT /api/watchlist/:id 
```
### Remove from watchlist
``` 
DELETE /api/watchlist/:id 
```

## 3.3 Review Endpoints
### Get all reviews
``` 
GET /api/reviews 
```
### Create new review
``` 
POST /api/reviews 
```
### Update review
``` 
PUT /api/reviews/:id 
``` 
### Delete review
``` 
DELETE /api/reviews/:id 
```

3.4 Search History Endpoints
### Get user's search history
``` 
GET /api/search-history 
``` 
### Add search history
``` 
POST /api/search-history 
```
### Delete search history
``` 
DELETE /api/search-history/:id 
```

## 📦4. Project Tools
The following is a list of tools and dependencies used in this project along with their versions and links to download and npm.

## Development Tools
- ![Node.js](https://nodejs.org/static/images/logo.svg) [**Download Node.js**](https://nodejs.org/en/download/)
- ![Express.js](https://github.com/rizkim17/Databasefoto/blob/main/express-js.png?raw=true) [**Download Express.js**](https://expressjs.com/)
- ![MySQL](https://www.mysql.com/common/logos/logo-mysql-170x115.png) [**Download MySQL**](https://dev.mysql.com/downloads/)
- ![XAMPP](https://upload.wikimedia.org/wikipedia/en/thumb/7/78/XAMPP_logo.svg/120px-XAMPP_logo.svg.png) 
[**Download XAMPP**](https://www.apachefriends.org/download.html)
## 📜 Dependencies

| Package | Version | Link |
|---------|---------|------|
| ![axios](https://img.shields.io/npm/v/axios.svg) | `^1.7.9` | [axios](https://www.npmjs.com/package/axios) |
| ![bcryptjs](https://img.shields.io/npm/v/bcryptjs.svg) | `^2.4.3` | [bcryptjs](https://www.npmjs.com/package/bcryptjs) |
| ![cors](https://img.shields.io/npm/v/cors.svg) | `^2.8.5` | [cors](https://www.npmjs.com/package/cors) |
| ![dotenv](https://img.shields.io/npm/v/dotenv.svg) | `^16.4.7` | [dotenv](https://www.npmjs.com/package/dotenv) |
| ![express](https://img.shields.io/npm/v/express.svg) | `^4.21.2` | [express](https://www.npmjs.com/package/express) |
| ![express-validator](https://img.shields.io/npm/v/express-validator.svg) | `^7.2.1` | [express-validator](https://www.npmjs.com/package/express-validator) |
| ![jsonwebtoken](https://img.shields.io/npm/v/jsonwebtoken.svg) | `^9.0.2` | [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) |
| ![mysql2](https://img.shields.io/npm/v/mysql2.svg) | `^3.12.0` | [mysql2](https://www.npmjs.com/package/mysql2) |


## Function
1. **axios** → Library buat ngambil data dari API dengan lebih gampang, bisa dipakai buat GET, POST, atau request lain ke server. Dibanding `fetch`, axios punya fitur tambahan kayak timeout, otomatis ubah data ke JSON, dan bisa pakai interceptor buat handle error atau token.  

2. **bcryptjs** → Digunakan buat nge-hash (enkripsi) password sebelum disimpan ke database, biar lebih aman dan nggak bisa dibaca langsung. Selain itu, bcrypt juga bisa ngecek apakah password yang dimasukkan user cocok dengan yang udah di-hash sebelumnya.  

3. **cors** → Middleware buat mengizinkan request dari domain yang berbeda ke backend. Tanpa CORS, browser bakal blokir request kalau frontend dan backend beda origin (misal frontend di `localhost:3000` dan backend di `localhost:5000`).  

4. **dotenv** → Dipakai buat menyimpan variabel lingkungan (environment variables) dalam file `.env`, misalnya API key, URL database, atau konfigurasi lain. Ini bikin kode lebih rapi dan aman karena data sensitif nggak langsung ditulis di script utama.  

5. **express** → Framework untuk Node.js yang bikin pembuatan backend jadi lebih cepat dan mudah. Express menyediakan fitur seperti routing, middleware, dan handler request, jadi nggak perlu bikin semuanya dari nol.  

6. **express-validator** → Digunakan buat validasi input dari user sebelum diproses atau masuk ke database. Misalnya buat ngecek apakah email valid, password cukup panjang, atau field tertentu nggak boleh kosong, biar aplikasi lebih aman dan terhindar dari error.  

7. **jsonwebtoken** → Library buat bikin dan memverifikasi token JWT, yang biasa dipakai buat sistem autentikasi tanpa perlu nyimpen session di server. JWT ini sering digunakan buat login, jadi setiap user yang login dapat token yang bisa dipakai buat akses data tanpa perlu login ulang.  

8. **mysql2** → Library buat koneksi ke database MySQL dari aplikasi Node.js. Dibandingkan `mysql`, versi `mysql2` lebih cepat, lebih ringan, dan mendukung fitur modern MySQL seperti prepared statements, promise API, dan streaming data.
---
**ℹ️ Note:** The version displayed on the badge may change according to the latest version released on npm. Or you can simply install it once in terminal or bash.

```bash
npm install axios bcryptjs cors dotenv express express-validator jsonwebtoken mysql2
```

## 5. Implementation Details
### 5.1 Project Structure

```
anime-watchlist-api/
├── config/
|   ├── config.js
│   └── database.js
├── controllers/
|   ├──anime.controller.js
│   ├── auth.Controller.js
│   ├── review.Controller.js
│   ├── search.History.Controller.js
│   └── watchlist.Controller.js
├── middleware/
│   ├── auth.middleware.js
│   └──validator.middleware.js
├── models/
│   ├── anime.mode.js
│   ├── review,.js
│   ├── search.history.model.js
│   ├── user.model.js
│   └── watchlist.model.js
├── routes/
│   ├── anime.routes.js
│   ├── auth.routesjs
│   ├── index.js
│   ├── review.routes.js
│   ├── reviews.js
│   └── searchHistory.js
└── server.js
```

### 5.2 Authentication Implementation

```javascript
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return response.error(res, "No token provided", 401);
    }
    
    const token = authHeader.split(" ")[1];
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return response.error(res, "Invalid token", 403);
    }
};

```
This ``verifyToken`` function acts as an authentication middleware that uses JSON Web Token (JWT). First, it checks the Authorization header of each incoming request. The Authorization header must use the token's “Bearer” format, which is the industry standard for token-based authentication.When a request comes in, the middleware will perform several checks.

Checks for the presence of the Authorization header and ensures that it is in the correct format (starting with “Bearer”). Retrieves the token by separating the “Bearer” string from the actual token. Verifies the token using ``jwt.verify()` with JWT_SECRET stored in environment variables. If the verification is successful, the userId of the token will be stored into the request object for use by the next handler. If an error occurs in the verification process, it will return an appropriate error response.

### 5.3 Implementasi Validator
```javascript
const { body, validationResult } = require("express-validator");

const registerValidation = [
    body("username").isLength({ min: 3 }).trim().escape(),
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
];

const loginValidation = [
    body("email").isEmail().normalizeEmail(),
    body("password").exists(),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
```
This validation system uses express-validator to ensure the incoming data matches the specified criteria.

``registerValidation`` -> This validator is used for the new user registration process.There are three fields that are validated:
- Must have at least 3 characters.The trim() function removes leading and trailing spaces, while escape() converts HTML special characters into HTML entities to prevent XSS (Cross-Site Scripting).
- Ensures the email format is valid and performs normalization (such as removing periods in the gmail address).
- Password: Require a minimum of 6 characters for better security.

``loginValidation`` -> Validator for simpler login process
- Validates the email format and normalizes it
- Only checks for password existence without character length validation

``validate`` -> This function acts as middleware that handles validation results
- Uses validationResult to collect all validation errors
- If an error is found, returns a response with status 400 (Bad Request) along with the error details
- If validation is successful, proceeds to the next middleware with ``next()``

### 5.4 MySQL Database Configuration
```javascript
const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
```
In this database configuration, we use MySQL2 with its Promise feature, which allows us to handle asynchronous database operations more easily. Using Promise makes our code neater and more readable than the traditional callback style.


We create a connection pool, which we can think of as a pool of ready-made database connections. This is much more efficient than creating a new connection every time there is a request, because connections can be reused. This connection pool is configured to hold a maximum of 10 active connections at a time, which is usually enough for medium-sized applications.

All sensitive information such as usernames, passwords, and database names are not written directly in the code, but stored in the .env file. It's like keeping your house keys in a safe place, instead of sticking them on the front door. With dotenv, we can easily access these variables through process.env.

### 5.5 Jikan API Configuration
```javascript
module.exports = {
    jikanBaseUrl: "https://api.jikan.moe/v4",
};
```
For the Jikan API, the configuration is very straightforward. We only need to save the basic URL of the Jikan API that we will use. Jikan itself is a very popular free API for accessing anime and manga data from MyAnimeList.

Although the configuration is simple, it is a good practice in application development. By storing the API URL in a separate configuration file, we can easily change it if Jikan releases a new version or we need to move to another API. We don't have to search through the code to change the URL, just change it in this one place.

These two configurations work together to make our application run well. The MySQL database stores user data and their preferences, while the Jikan API provides up-to-date anime data. The combination of the two allows us to create a complete and dynamic anime watchlist application.

## 6. Testing Postman
## Auth
### Register
**Endpoint:**
```
POST /api/auth/register
```
**Example cURL Request:**
```sh
--location 'http://localhost:5000/api/auth/register'


--data-raw 
{
    "username": "rizkimaulana",
    "email": "iq@example.com",
    "password": "password123"
}
```

**Response:**
```json
{
    "status": "success",
    "message": "Registration successful",
    "data": {
        "token": "<JWT_TOKEN>"
    }
}
```

---

### Login
**Endpoint:**
```
POST /api/auth/login
```
**Example cURL Request:**
```sh
curl 
--location 'http://localhost:5000/api/auth/login'

--data-raw {
    "email": "iq@example.com",
    "password": "password123"
}
```

**Response:**
```json
{
    "status": "success",
    "message": "Login successful",
    "data": {
        "token": "<JWT_TOKEN>"
    }
}
```

---

### Get Profile
**Endpoint:**
```
GET /api/auth/profile
```

**Authorization:**
Bearer Token

**Example cURL Request:**
```sh
curl 
--location 'http://localhost:5000/api/auth/profile'
--header 'Authorization: Bearer <JWT_TOKEN>'
```

**Response:**
```json
{
    "status": "success",
    "message": "Success",
    "data": {
        "id": 1,
        "username": "rizkimaulana",
        "email": "iq@example.com",
        "profile_picture": null,
        "created_at": "2025-02-01T16:46:00.000Z"
    }
}
```

---

### Update Profile
**Endpoint:**
```
PUT /api/auth/profile
```
**Authorization:**
Bearer Token
**Example cURL Request:**
```sh
curl --location --request PUT 'http://localhost:5000/api/auth/profile' \
--header 'Authorization: Bearer <JWT_TOKEN>' \
--data-raw '{
    "username": "iqmaulana"
}'
```

**Response:**
```json
{
    "status": "success",
    "message": "Profile updated successfully",
    "data": null
}
```

## 7. API Documentation
Anime Watchlist API Documentation use postman you can click 👉[**Link in here**](https://documenter.getpostman.com/view/40816838/2sAYX3qiX1)