# Stage 1: build
FROM node:18-alpine AS builder

# Expose the app port
Expose 80

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --silent

COPY . .
RUN npm run build

# Stage 2: serve # I'm using nginx (static file server not just reverse proxy) here not node because frontend files are static and don't need build
FROM nginx:alpine 

# Create non-root user to de-escalate privileges and reduce the effect of a possible intrusion
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Remove default nginx config # Remove default Nginx config to prevent conflicting server blocks and ensure predictable routing
RUN rm /etc/nginx/conf.d/default.conf

# Copy build files from stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config # Add custom Nginx config as the single source of truth for request handling
COPY nginx.conf /etc/nginx/conf.d/

# Change ownership (chown) recursively(-R) to non-root user (app user)
RUN chown -R appuser:appgroup /usr/share/nginx/html \ # contains frontend files
    && chown -R appuser:appgroup /var/cache/nginx \ # contains cached files
    && chown -R appuser:appgroup /var/log/nginx # contains file logs

USER appuser # switches to the user because Docker doesn't switch be default

CMD ["nginx", "-g", "daemon off;"] # starts nginx as a foreground and not in background (best practice)
