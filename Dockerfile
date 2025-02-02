FROM node:20

WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app
RUN mkdir /app/voice_data

RUN npx prisma generate
RUN npm run build

CMD ["npm", "start"]