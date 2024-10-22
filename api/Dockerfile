FROM node:lts-alpine AS dev

WORKDIR /app  ## make a directory and go inside it
COPY *.json ./
RUN npm install ## ok because node and npm is included in alpine
COPY src src
COPY database database
COPY data data

RUN npm run create
RUN npm run seed
EXPOSE 4000

CMD ["npm", "run", "dev"]
