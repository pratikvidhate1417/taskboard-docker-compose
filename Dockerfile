# Use official Node.js image
FROM node:18

# Create app directory inside container
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5050

# Start the application
CMD ["node", "server.js"]
