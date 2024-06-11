# nuxt-app.develop.Dockerfile
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml first for caching
COPY nuxt-app/package*.json ./
COPY nuxt-app/pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the nuxt-app code
COPY nuxt-app/. .

# Expose the port
EXPOSE 3000

# Run the nuuxt-app en dev
CMD ["pnpm", "dev", "-o"]