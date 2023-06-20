FROM node:latest

WORKDIR /app/

COPY package*.json ./

RUN npm install

COPY . .

ENV DISCORD_BOT_TOKEN=''
ENV MONGODB_URI='mongodb://root:example@mongo:27017/touch-grass-bot'
ENV MONGO_INITDB_ROOT_USERNAME='root'
ENV MONGO_INITDB_ROOT_PASSWORD='example'

CMD ["npm", "start"]