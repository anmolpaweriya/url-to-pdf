# Use Debian Bullseye (stable + glibc)
FROM node:18-bullseye

# Install Chromium and required dependencies
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-liberation \
    fonts-noto-color-emoji \
    libasound2 \
    libatk-bridge2.0-0 \
    libgtk-3-0 \
    libnss3 \
    libxss1 \
    xdg-utils \
    ca-certificates \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Prevent Puppeteer from downloading its own Chromium
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Create non-root user (security best practice)
RUN useradd -m pptruser

WORKDIR /app

COPY package*.json ./

# Install only production deps
RUN npm install --production

COPY . .

# Change ownership to non-root user
RUN chown -R pptruser:pptruser /app

USER pptruser

EXPOSE 3000

CMD ["node", "index.js"]
