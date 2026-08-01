# 1. Define a build argument (with a default fallback)
ARG PW_VERSION=v1.43.0-jammy

# 2. Pass that argument into the FROM instruction
FROM mcr.microsoft.com/playwright:${PW_VERSION}

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npx", "playwright", "test"]