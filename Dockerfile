# FROM node:alpine3.17

# WORKDIR /app

# COPY package*.json ./

# RUN npm install
# # RUN npm ci && npm cache clean --force

# COPY . .

# EXPOSE ${PORT}

# CMD [ "npm", "run", "start:prisma" ]
FROM node:gallium-alpine3.17 as build

WORKDIR /app

COPY package*.json .

RUN npm ci && npm cache clean --force

COPY . .

FROM node:gallium-alpine3.17

COPY --from=build /app /app

EXPOSE ${PORT}

CMD [ "npm", "run", "start:prisma" ]
