FROM node:8.4.0

# Set /app-service as workdir
RUN mkdir /app-service
WORKDIR /app-service

COPY package.json .
COPY package-lock.json .
RUN npm install --quiet

COPY . .
