#Sample Dockerfile for NodeJS Apps

FROM node:18.17.0
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "node", "server.js" ]