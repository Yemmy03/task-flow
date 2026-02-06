# Stage 1: build
FROM node:18-alpine AS builder

# Expose the app port
EXPOSE 8080

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --silent

COPY . .
RUN npm run build

# Stage 2: serve # I am using nginx (static file server not just reverse proxy) here not node because frontend files are static and don't need build
FROM nginx:alpine 

# Create non-root user to de-escalate privileges and reduce the effect of a possible intrusion
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Remove default nginx config # Remove default Nginx config to prevent conflicting server blocks and ensure predictable routing
RUN rm /etc/nginx/conf.d/default.conf

# Copy build files from stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config # Add custom Nginx config as the single source of truth for request handling
COPY nginx.conf /etc/nginx/nginx.conf

# Change ownership (chown) recursively(-R) to allow non-root (app user) read files
RUN chown -R appuser:appgroup /usr/share/nginx/html \
    && chown -R appuser:appgroup /var/cache/nginx \
    && chown -R appuser:appgroup /var/log/nginx \
    && chown appuser:appgroup /etc/nginx/nginx.conf

# Switch to non-root user for security
# USER appuser

CMD ["nginx", "-g", "daemon off;"] 
