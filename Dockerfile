# 1. Use a standard Node LTS base image (Debian Bookworm)
FROM node:20-bookworm

# Set the working directory inside the container
WORKDIR /app

# 2. Copy package.json files first (this helps Docker cache the dependencies)
COPY package*.json ./

# 3. Install NPM packages (This locks in whatever exact Playwright version is in your package.json)
RUN npm install

# 4. Automatically install the matching Chromium browser AND missing Linux dependencies
RUN npx playwright install --with-deps chromium

# 5. Copy the rest of your test code and configuration
COPY . .

# 6. Default command to run tests (Cloud Run will execute this)
CMD ["npx", "playwright", "test"]