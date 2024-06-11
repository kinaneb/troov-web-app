# server.develop.Dockerfile
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml first for caching
COPY server/package*.json ./
COPY server/pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the server code
COPY server/. .

# Expose the port
EXPOSE 3000

# Run the server en dev
CMD ["pnpm", "dev"]
