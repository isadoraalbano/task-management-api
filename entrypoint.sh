#!/bin/sh

npm run build
npx prisma migrate deploy
npm run start:prod
