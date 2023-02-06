FROM node:18.14.0-alpine3.16

WORKDIR /app

COPY package*.json ./

RUN npm install
# RUN npm ci & npm cache clean --force

COPY . .

# RUN npx prisma generate

EXPOSE ${PORT}

CMD [ "npm", "run", "prisma:start" ]