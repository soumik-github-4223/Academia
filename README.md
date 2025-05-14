# Academia

Academia is a comprehensive e-learning platform designed to provide users with an exceptional learning experience. It features a secure authentication system, robust backend APIs, real-time notifications, and seamless integration with third-party services like Stripe, Cloudinary, and more. This project is built using modern web technologies such as Next.js, Node.js, Redis, and Socket.IO.

---

## Features

### Authentication
- Secure authentication system with **refresh and access tokens**.
- **OTP-based user registration** for added security.
- Seamless **login/logout functionality**.
- Support for **Google** and **GitHub authentication**.
- Features to **update user information**, **reset passwords**, and **delete accounts**.

### Backend APIs
- Over **30 REST APIs** to handle various functionalities:
  - **Courses**: Create, edit, delete, and fetch courses.
  - **Orders**: Manage orders and payment processing.
  - **Analytics**: Generate user and course analytics for the past 12 months.
  - **Reviews**: Facilitate user reviews and replies.

### Payment Integration
- Integrated **Stripe** as a payment gateway for secure and smooth transactions.

### Real-Time Features
- **Real-time notifications** powered by **Socket.IO**.
- Automated tasks like deleting old notifications using **CRON jobs**.

### Email Functionality
- Dynamic emails for OTPs and user queries using **EJS templates**.

### Caching and Performance
- **Redis** is used for caching frequently accessed data, reducing database load by 30%.
- Improved performance and faster response times for popular courses.

### Media Management
- **Cloudinary** integration for media storage, enabling seamless profile picture updates and course content management.

### Frontend Features
- Built with **Next.js**, leveraging:
  - **Lazy loading** for optimized performance.
  - **Server-side rendering (SSR)** for improved SEO.
- Efficient state management and caching of previously visited URLs using **RTK Query**, enhancing user experience by 40%.

---

## Project Structure

The project is divided into two main parts: **client** and **server**.

### Client
The frontend is built using **Next.js** and includes:
- **Pages**: Dynamic routing for various pages.
- **Redux**: State management using RTK Query.
- **Tailwind CSS**: For styling the application.
- **Cloudinary**: For handling media uploads.

### Server
The backend is built using **Node.js** and includes:
- **Authentication**: Secure user authentication and authorization.
- **Controllers**: Handle business logic for various features.
- **Models**: Database models for users, courses, orders, notifications, etc.
- **Services**: Reusable services for handling complex operations.
- **Utils**: Utility functions for common tasks.
- **Redis**: For caching frequently accessed data.
- **Socket.IO**: For real-time notifications.
- **EJS**: For dynamic email templates.

---

## Technologies Used

### Frontend
- **Next.js**: React framework for server-side rendering and static site generation.
- **RTK Query**: For efficient state management and caching.
- **Tailwind CSS**: For styling.
- **Cloudinary**: For media storage.

### Backend
- **Node.js**: JavaScript runtime for building the server.
- **Redis**: For caching frequently accessed data.
- **Socket.IO**: For real-time communication.
- **EJS**: For dynamic email templates.
- **Stripe**: For payment processing.

---

### Prerequisites
- Node.js installed on your system.
- Redis server running locally or on a cloud provider.
- Cloudinary account for media storage.
- Stripe account for payment integration.
