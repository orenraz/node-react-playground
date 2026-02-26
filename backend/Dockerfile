FROM node:18-alpine AS builder
WORKDIR /usr/src/app

# Install build deps
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

FROM node:18-alpine AS runtime
WORKDIR /usr/src/app

# Create non-root user
RUN addgroup -S app && adduser -S app -G app

# Copy production deps and built files from builder
COPY package.json package-lock.json* ./
RUN npm ci --only=production
COPY --from=builder /usr/src/app/dist ./dist

USER app
EXPOSE 3030
ENV NODE_ENV=production
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD curl -f http://localhost:3030/health || exit 1
CMD ["node", "dist/main.js"]
