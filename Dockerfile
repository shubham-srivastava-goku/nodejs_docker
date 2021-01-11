FROM node:12-alpine
WORKDIR /app/server
COPY package.json package-lock.json ./
RUN npm install
# --production with npm install for release build
COPY . .
ARG DEFAULT_PORT=80
ENV PORT $DEFAULT_PORT
EXPOSE 8080 $PORT
# VOLUME ["/app/server/temp"]
CMD ["npm", "start"]