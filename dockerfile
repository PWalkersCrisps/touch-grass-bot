FROM node:18.12.1

WORKDIR /app/

COPY package*.json ./

RUN npm install

COPY . .

ENV BOT_TOKEN=''
ENV MONGODB_SRV=''

CMD ["npm", "start"]