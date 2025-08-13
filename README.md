# Imagify

Imagify is a MERN stack web application that allows users to generate images from text prompts using the ClipDrop API. Users can register, log in, manage their credits, and download the images they create.

## ✨ Features

  - **Text-to-Image Generation:** Create unique images from simple text descriptions.
  - **User Authentication:** Secure user registration and login.
  - **Credit System:** A system to manage user credits for image generation.
  - **Payment Integration:** Seamless payment processing for credit top-ups using Razorpay.
  - **Responsive Design:** A clean, mobile-friendly user interface built with Tailwind CSS.

## 🚀 Live Demo

[https://imagify-frontend-gjzn.onrender.com]

## 🛠️ Tech Stack

**Frontend:**

  - **React:** For building the user interface.
  - **React Router DOM:** For handling client-side routing.
  - **Axios:** For making API requests to the backend.
  - **React Toastify:** For displaying notifications and feedback.
  - **Tailwind CSS:** For styling the application.
  - **Framer Motion:** For animations and transitions.

**Backend:**

  - **Node.js & Express:** For the server-side logic and API endpoints.
  - **MongoDB:** A NoSQL database for storing user and transaction data.
  - **Mongoose:** An object data modeling (ODM) library for MongoDB.
  - **Bcrypt:** For hashing and securing user passwords.
  - **JSON Web Tokens (JWT):** For user authentication and authorization.
  - **ClipDrop API:** The primary service for text-to-image generation.
  - **Razorpay API:** For handling secure payments.

## ⚙️ Setup and Installation

Follow these steps to get a local copy of the project up and running on your machine.

### Prerequisites

You'll need the following installed on your machine:

  - Node.js (v18 or higher)
  - npm or yarn
  - MongoDB
  - Git

### Backend Setup

1.  Clone the repository:

    ```bash
    git clone [https://github.com/amarjec/imagify]
    cd imagify
    ```

2.  Navigate to the `server` directory and install dependencies:

    ```bash
    cd server
    npm install
    ```

3.  Create a `.env` file in the `server` directory and add your environment variables:

    ```env
    MONGO_URI="[Your MongoDB Connection String]"
    JWT_SECRET="[A long, random secret string]"
    CLIPDROP_API="[Your ClipDrop API Key]"
    RAZORPAY_KEY_ID="[Your Razorpay Key ID]"
    RAZORPAY_KEY_SECRET="[Your Razorpay Key Secret]"
    CURRENCY="INR"
    ```

4.  Start the backend server:

    ```bash
    npm run start
    ```

### Frontend Setup

1.  Navigate to the `client` directory and install dependencies:

    ```bash
    cd ../client
    npm install
    ```

2.  Create a `.env` file in the `client` directory and add your environment variable:

    ```env
    VITE_BACKEND_URL="http://localhost:4000"
    VITE_RAZORPAY_KEY_ID="[Your Razorpay Key ID]"
    ```

3.  Start the frontend development server:

    ```bash
    npm run dev
    ```

The application should now be running on `http://localhost:5173`.


## 📧 Contact

  - **Amar Agrawal** - @amarjec
  - **Project Link:** https://imagify-frontend-gjzn.onrender.com/
