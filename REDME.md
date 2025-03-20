# Backend Developer Machine Test

A comprehensive backend application built with Node.js, Express.js, TypeScript, and MongoDB that manages user authentication, product management, a blocking system, and token-based authentication.

## Features

### User Authentication & Profile Management
- JWT-based authentication with Access & Refresh Tokens
- User registration and login
- Profile updating and deletion
- Token refresh mechanism

### Brand Management
- Create and manage brands with categories
- Fetch all brands with their categories

### Product Management
- Add, edit, and delete products
- Products linked to brands and categories
- User-specific product ownership

### Advanced Product Viewing
- Sort products by price or name
- Filter by brand and category
- Blocking system integration

### User Blocking System
- Block/unblock other users
- Blocked users cannot view blocker's products

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (Access & Refresh Tokens)
- **Password Security**: bcrypt.js
- **Image Storage**: Multer & Cloudinary
- **Language**: TypeScript

## Installation & Setup

1. Clone the repository
   ```
   git clone https://github.com/Suresh0750/Backend-Supportta_Solutions-.git
   cd Backend-Supportta_Solutions-
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   
   ```

4. Run the application
   - Development mode:
     ```
     npm run dev
     ```
   - Build:
     ```
     npm run build
     ```
   - Production mode:
     ```
     npm start
     ```

## API Documentation

### Base URLs
- User: `http://localhost:3000/api/user`
- Brand: `http://localhost:3000/api/brand`
- Product: `http://localhost:3000/api/product`

### User Authentication

#### User Endpoints
- Signup: `POST {{UserBase_URL}}/signup`
- Login: `POST {{UserBase_URL}}/login`
- Block User: `PATCH {{UserBase_URL}}/toggle-block/67daad7d8957da100683d88a`
- Renew Access Token: `POST {{UserBase_URL}}/refresh-token`

### Brand Management

#### Brand Endpoints
- Create: `POST {{Brand_Base_URL}}/create`
- List: `GET {{Brand_Base_URL}}/list/Mobiles`

### Product Management

#### Product Endpoints
- Create: `POST {{Product_Base_URL}}/create`
- List: `GET {{Product_Base_URL}}/filter?price=999&&productName=TitanWatch&&brand=Titan&&category=Watch`
- Update: `PUT {{Product_Base_URL}}/update`
- Delete: `DELETE {{Product_Base_URL}}/delete/67dae3efc5492b73ac59c9a7`

