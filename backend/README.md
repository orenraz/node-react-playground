# Backend Service

This is the backend service for the edu-jarvis application, built using NestJS. It provides APIs for the web and mobile applications, handles database interactions, and includes various utility services.

## Features
- RESTful API built with NestJS.
- MongoDB integration for data persistence.
- Environment-based configuration management.
- Validation schemas for environment variables and user input.
- Modular architecture for scalability.
- Dockerized for easy deployment.

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB instance

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/orenraz/node-react-playground/tree/main/backend.git
   cd edu-jarvis/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

#### Development Mode
```bash
npm run start:dev
```
- The backend will be available at `http://localhost:3030`.

#### Debug Mode
```bash
npm run debug
```
- Debugger will listen on port `9229`.

#### Production Mode
```bash
npm run build
npm start
```

### Environment Variables
Create a `.env` file in the `backend` directory with the following variables:
```env
NODE_ENV=development
PORT=3030
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
LOG_LEVEL=debug
ALLOWED_ORIGINS=http://localhost:4000
```

### Testing
Run unit tests:
```bash
npm run test
```
Run end-to-end tests:
```bash
npm run test:e2e
```

## Deployment

### Docker
Build and run the Docker container:
```bash
docker-compose up --build
```

### Kubernetes
Use the provided `k8s` manifests to deploy the backend to a Kubernetes cluster.

## API Documentation
- Swagger documentation is available at `http://localhost:3030/api` when the application is running.

## Contributing
1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request.

## License
This project is licensed under the MIT License.

## TODOS 

Fix Compilation Errors

Standardize error handling across the application using global exception filters.
Increase Test Coverage

Add tests for edge cases in database-connection.spec.ts and other critical modules.
Optimize Performance

Implement caching for frequently accessed data.
Optimize database queries and ensure indexes are used.
Enhance Deployment Readiness

Improve CI/CD pipelines to include security scanning and deployment workflows.
Optimize the Dockerfile for smaller image size.