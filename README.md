# edu-jarvis

Monorepo with a NestJS backend and a React web app.

## Quick start

### 1. Install dependencies for each app

Open a terminal in the repo root and run:

```bash
cd backend
npm install
cd ../web
npm install
```

### 2. Start the backend

```bash
cd backend
npm run start:dev   # starts NestJS on http://localhost:3030
```

---

## Backend
- Files: [backend/package.json](backend/package.json)

### Debugging the Backend
- Launch the backend in debug mode (inspect port 9229):

```bash
cd backend
npm run backend:dev:debug
```

- Or use the VS Code launch configuration `Run Backend(dev:debug) (see [.vscode/launch.json](.vscode/launch.json)).

### Production / Container
- Build and run the backend container:

```bash
docker-compose up --build
```

---

## Web App (React + Vite)

- Files: [web/package.json](web/package.json)
- Uses shared API client from [shared/api-client](shared/api-client)

### Install dependencies

```bash
cd web
npm install
```

### Development

```bash
cd web
npm run dev
# Open http://localhost:4000
```

### Production Build

```bash
cd web
npm run build
# Output: web/dist/
```

### Configuration

- Set `VITE_BACKEND_URL` environment variable to point to backend
- Default: `http://localhost:3030`
- Create `.env` file with the required variables

---

## Shared Packages

### API Client ([shared/api-client](shared/api-client))

Shared API client for the web app with methods for all backend endpoints.

See [shared/api-client/README.md](shared/api-client/README.md) for usage documentation.

---

## Notes
- Each app (backend, web) manages its own `node_modules` and lockfile. There are no npm workspaces or root-level scripts.
