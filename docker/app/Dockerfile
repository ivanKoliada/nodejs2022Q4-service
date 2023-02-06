FROM node:18.14.0-alpine3.16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD [ "npm", "run", "start:prisma" ]