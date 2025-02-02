FROM node:20

WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app

RUN npx prisma migrate deploy
RUN npx prisma generate

RUN mkdir /app/voice_data

RUN npm run build

CMD ["npm", "start"]