FROM node:12-alpine
WORKDIR /app/server
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .
EXPOSE 8080 80
CMD npm start