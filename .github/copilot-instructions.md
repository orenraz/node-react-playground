Copilot Instructions

Languages & Frameworks
- Use TypeScript for all backend, frontend, and shared code.
- Backend: Node.js (NestJS preferred).
- Frontend: React (with functional components).
- Mobile: React Native (Expo).

Architecture
- Apply Clean Architecture: domain logic separated from infrastructure and presentation.
- Use dependency injection and modular structure.
- Organize code by feature modules.

Testing
- Use Jest for all tests (unit, integration, e2e).
- Write tests for every new feature, bug fix, and refactor.
- Mock external dependencies in unit tests.
- Use test setup/teardown hooks for consistent state.

Linting & Formatting
- Enforce ESLint and Prettier for all code.
- Fix lint errors before committing.
- Use consistent naming conventions (camelCase for variables, PascalCase for classes/components).

Documentation
- Add JSDoc comments for exported functions, classes, and modules.
- Update README.md and module docs for new features.

Security & Reliability
- Validate all user input (especially API endpoints).
- Use environment variables for secrets/config.
- Handle errors gracefully; log exceptions.
- Avoid exposing sensitive data in logs.


Performance
- Optimize database queries and API endpoints.
- Use memoization and lazy loading in React where appropriate.

Imports
- Always use import aliases for modules and shared code.

General
- Prefer async/await for asynchronous code.
- Keep functions and components small and focused.
- Use prop-types or TypeScript interfaces for React props.
- Avoid inline styles; use CSS modules or styled-components.
- Use absolute imports for shared modules.

Popular Additional Rules
- Use GitHub Actions for CI/CD (lint, test, build).
- Write commit messages in conventional format (e.g., feat:, fix:, chore:).
- Use Docker for local development and production builds.
- Keep dependencies up to date; avoid deprecated packages.
- Use feature flags for experimental features.
