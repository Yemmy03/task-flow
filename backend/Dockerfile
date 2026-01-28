# Stage 1: build dependencies
FROM python:3.11-slim AS builder

# Expose the app port
EXPOSE 8001

# Set working directory form container to /app
WORKDIR /app

# Install system build dependencies (this step is included because we're calling a database)
RUN apt-get update && apt-get install -y --no-install-recommends gcc libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app ./app

# Stage 2: runtime
FROM python:3.11-slim

# Create non-root user to de-escalate privileges and reduce the effect of a possible intrusion
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set working directory inside container
WORKDIR /app

# Install runtime dependencies for Postgre (this step is included because we're calling a database)
RUN apt-get update && apt-get install -y --no-install-recommends gcc libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy installed packages from builder
COPY --from=builder /usr/local /usr/local

# Change ownership (chown) recursively(-R) to non-root user (app user)
RUN chown -R appuser:appgroup /app

# Switches to the user because Docker doesn't switch by default
USER appuser

# Start App
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8001"]
