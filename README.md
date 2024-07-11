## Description
The car rental app involves creating a simple and easy-to-use platform for users to search, filter, and book rental cars for different locations and times. 
It also serves as a comprehensive management system for administrators to oversee bookings, cars, models, brands, and locations. 
The app ensures a secure experience through robust authentication and authorization features that cater to both end-users and administrators.

![Home page](https://github.com/Cristina369/react-photo-studio/blob/5d04183c27e02c80ab71d67c498841c63bd37f6f/src/images/Art-Maison.png?raw=true "Art Maison home page")

Administrators also have a management system that allows them to oversee all aspects of the car rental business, including managing reservations, cars, models, brands and locations.
The administrative interface is designed to be easy to use, making it easy to maintain and update your rental car inventory and reservations.

## Technology Stack
### Backend:
- Programming Language: C#
- Framework: ASP.NET Core
- Data Access: Entity Framework Core
- Database: SQL Server
- Authentication and Authorization: ASP.NET Identity, JWT (JSON Web Tokens)
- API: ASP.NET Core Web API
### Frontend:
- Programming Language: TypeScript
- Framework: Angular
- UI Library: Bootstrap
- State Management: RxJS
- Routing: Angular Router

## Design
coming soon :)

## Features
- User-Friendly Search and Filtering: Users can easily search for cars based on various criteria such as location, time, brand, price, and model.
- Booking Management: Users can book cars for their preferred time slots and manage their reservations.
- Admin Dashboard: Administrators have access to a powerful dashboard to manage all aspects of the car rental business, including cars, models, brands, locations, and reservations.
- Secure Authentication and Authorization: The application uses ASP.NET Identity and JWT for secure user authentication and role-based authorization.
- Responsive Design: The front-end application is built with Angular Material, ensuring a responsive and mobile-friendly user interface.


## Getting Started
# Prerequisits
Before running the application, ensure you have the following installed:
- Node.js: To run the frontend Angular application.
- Angular CLI: To build and serve the Angular application.
- .NET Core SDK: To run the backend ASP.NET Core application.
- SQL Server: To host the database (if not using SQLite for development).

# Clone the Repository
```git clone https://github.com/your-username/car-rental-app.git```
```cd car-rental-app```

# Frontend Setup
```cd frontend```
```npm install```
```ng serve```

# Backend Setup
```cd backend```
```dotnet restore```   
```dotnet run```

# Database Configuration
Update the database connection string in appsettings.json in the backend project if needed.
Run Entity Framework Core migrations to apply database changes:
```dotnet ef database update```

# Login Credentials
Use the following credentials for testing:
- Admin: Username: admin@example.com | Password: admin123
- User: Username: user@example.com | Password: user123

# Notes
Ensure both frontend and backend servers are running simultaneously for full application functionality.
For production deployment, update environment variables and configure appropriate security settings.
