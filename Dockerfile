FROM node:gallium-alpine3.17 as build

WORKDIR /app

COPY package*.json .

RUN npm ci && npm cache clean --force

COPY . .

FROM node:gallium-alpine3.17

WORKDIR /app

COPY --from=build /app .

EXPOSE ${PORT}

CMD [ "npm", "run", "start:prisma" ]
