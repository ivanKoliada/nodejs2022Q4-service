FROM node:18.14.0-alpine3.16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE ${PORT}

CMD [ "node", "dist/main" ]