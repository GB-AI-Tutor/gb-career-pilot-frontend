FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Use environment variable for API URL
ENV VITE_API_BASE_URL=http://backend:8000

RUN npm run build

# Serve with simple HTTP server
RUN npm install -g serve
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]