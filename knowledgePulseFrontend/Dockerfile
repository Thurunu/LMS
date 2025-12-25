# Development Dockerfile for Vite (hot-reload)
FROM node:22-alpine

WORKDIR /app

# Install dependencies only (source will be mounted during `docker run`)
COPY package*.json ./
RUN npm install 

# Copy the rest so the image can run without mounts (optional)
COPY . .

# Vite default dev port
EXPOSE 5173

# Start Vite dev server and listen on all interfaces so host can access it
CMD ["sh", "-c", "npm run dev -- --host 0.0.0.0 --port 5173"]
