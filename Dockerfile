# Stage 1: Build frontend
FROM node:18.16.0-alpine3.17 as builder

WORKDIR /usr/src/app
COPY . .
RUN npm install && npm run build

# Step 2: Use build output from 'builder'
FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY --from=builder /usr/src/app/dist/angular-starter-kit/ .