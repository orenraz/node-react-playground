# @edu-jarvis/api-client

Shared API client for edu-jarvis web and mobile applications.

## Features

- Type-safe API methods with JSDoc annotations
- Request timeout handling (10s default)
- Automatic error handling and parsing
- No external dependencies (uses native fetch)

## Installation

This is a local package. Install it in your app using:

```bash
npm install file:../shared/api-client
```

## Usage

```javascript
import { ApiClient, ENDPOINTS } from '@edu-jarvis/api-client';

// Create client instance
const client = new ApiClient({
  baseUrl: 'http://localhost:3030',
  timeout: 10000 // optional, defaults to 10000ms
});

// Get application info
const info = await client.getHello();
console.log(info); // { app: "edu-jarvis-backend", version: "0.0.1" }

// Get health status
const health = await client.getHealth();
console.log(health); // { status: "ok", uptime: 123, timestamp: "2025-01-..." }

// Send greeting
const greeting = await client.greet({ name: 'World' });
console.log(greeting); // { message: "Hello, World!" }

// Get root
const root = await client.getRoot();
console.log(root); // { message: "Hello from backend" }
```

## API Methods

### `getRoot()`
Returns: `Promise<{ message: string }>`

Get root endpoint message.

### `getHello()`
Returns: `Promise<{ app: string, version: string }>`

Get application name and version.

### `getHealth()`
Returns: `Promise<{ status: string, uptime: number, timestamp: string }>`

Get health check status with uptime and timestamp.

### `greet(data)`
- **data**: `{ name: string }` - Name to greet
- Returns: `Promise<{ message: string }>`

Send a greeting request.

## Error Handling

All methods throw errors for:
- Network failures
- Request timeouts (after 10s by default)
- HTTP error responses (4xx, 5xx)

```javascript
try {
  const info = await client.getHello();
} catch (error) {
  console.error('API error:', error.message);
}
```

## Endpoint Constants

```javascript
import { ENDPOINTS } from '@edu-jarvis/api-client';

console.log(ENDPOINTS.ROOT);    // '/'
console.log(ENDPOINTS.HELLO);   // '/hello'
console.log(ENDPOINTS.HEALTH);  // '/health'
console.log(ENDPOINTS.GREET);   // '/greet'
```
