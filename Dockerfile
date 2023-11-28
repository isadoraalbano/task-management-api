FROM node:18

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

# COPY .env ./

COPY entrypoint.sh  ./

COPY tsconfig.json ./

RUN npm install

RUN npm run build

COPY . ./
RUN  --mount=type=secret,id=DATABASE_URL,dst=/etc/secrets/DATABASE_URL

RUN npm i -g prisma
RUN npx prisma migrate deploy

EXPOSE 3000

RUN git config --global core.autocrlf false


RUN ["chmod", "+x", "/app/entrypoint.sh"]

CMD ["/app/entrypoint.sh"]
