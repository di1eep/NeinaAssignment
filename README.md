# Slot booking for Hotel Assignment Project

## Project Overview
This project is a web-based application that manages student-teacher meetings. It is built using a modern full-stack approach, with React.js on the frontend, Node.js/Express.js on the backend, and MongoDB as the database. The application is deployed on an AWS instance.

---

## Technologies Used

### Frontend:
- **React.js**: The main JavaScript library used to build the user interface.
- **Vite**: Used to set up the development environment with fast build times.
- **Axios**: A promise-based HTTP client used to send requests to the backend API.
- **CORS**: Configured to resolve cross-origin resource sharing issues.
- **CSS**: Plain styling is used without any specific framework.

### Backend:
- **Node.js & Express.js**: Used to handle HTTP requests and manage the server-side logic.
- **Mongoose**: A MongoDB object modeling tool that helps interact with the database.
- **JWT (JSON Web Token)**: Used for secure token-based authentication.
- **Bcrypt**: A hashing library used to securely store user passwords.

### Database:
- **MongoDB**: Cloud-based NoSQL database used to store data.
  - **Collections:**
    - **Users**: Contains data about students and professors, including hashed passwords.
    - **Meetings**: Manages scheduled meetings between students and professors.

### Deployment:
- **AWS Instance**: Both the frontend and backend are deployed on an AWS instance.
- **Environment Variables**: Not yet implemented; sensitive details are currently hardcoded in the code.

---

## How to Run the Project

### Clone the Repository
```bash
git clone https://github.com/di1eep/NeinaAssignment.git
