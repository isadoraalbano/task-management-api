FROM node:18

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

COPY .env ./

COPY entrypoint.sh  ./

COPY tsconfig.json ./

RUN npm install

RUN npm run build

RUN npx prisma migrate deploy

COPY . ./

EXPOSE 3000

RUN git config --global core.autocrlf false


RUN ["chmod", "+x", "/app/entrypoint.sh"]

ENTRYPOINT ["/app/entrypoint.sh"]
