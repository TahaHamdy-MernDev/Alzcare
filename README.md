# AlzCare - Alzheimer's Care Management System

## Overview

AlzCare is a comprehensive web application designed to assist caregivers and family members in managing the care of Alzheimer's patients. The application provides features for medication management, health tracking, communication, and daily activity monitoring.

## Features

### Patient Management

- **Profile Management**: Store and manage patient information
- **Medical Details**: Track medical history and conditions
- **Test Results**: Record and monitor medical test results

### Medication Management

- **Prescription Tracking**: Manage patient prescriptions
- **Medication Reminders**: Automated reminders for medication schedules
- **Meal Alarms**: Schedule and manage meal times

### Caregiver Tools

- **Patient Monitoring**: Track multiple patients' health status
- **Medical Records**: Access to complete medical history
- **Prescription Management**: Manage and update patient prescriptions

### Communication

- **Chat System**: Real-time messaging between caregivers and patients
- **Community Forum**: Platform for caregivers to share experiences
- **Notifications**: Push notifications for important updates

### Additional Features

- **Diary/Journal**: Track daily activities and observations
- **Appointment Scheduling**: Manage medical appointments
- **Secure Authentication**: JWT-based authentication
- **Role-based Access Control**: Different access levels for patients and caregivers

## Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT, Passport.js
- **Real-time**: Socket.IO
- **File Storage**: Cloudinary
- **Push Notifications**: Firebase Cloud Messaging
- **Email**: Nodemailer
- **Documentation**: Swagger/OpenAPI

### Frontend

- **Templating**: EJS
- **Styling**: CSS (can be extended with a framework)

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (v4.4+)
- npm or yarn
- Firebase account (for push notifications)
- Cloudinary account (for file storage)

### Installation

1. Clone the repository:

   ```bash
   git clone [your-repository-url]
   cd alz-care
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=90d
   JWT_COOKIE_EXPIRES=90
   NODE_ENV=development
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   FIREBASE_SERVICE_ACCOUNT=path/to/your/firebase/serviceAccountKey.json
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

API documentation is available at `/api-docs` when the server is running.

## Project Structure

```
src/
├── config/           # Configuration files
├── controllers/      # Route controllers
├── middlewares/      # Custom express middlewares
├── models/           # Mongoose models
├── routes/           # Route definitions
├── utils/            # Utility classes and functions
└── views/            # EJS templates
```

## Security

- Helmet for setting various HTTP headers
- Express Rate Limit for API rate limiting
- Data sanitization against NoSQL query injection
- Protection against XSS attacks
- Secure HTTP headers

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
