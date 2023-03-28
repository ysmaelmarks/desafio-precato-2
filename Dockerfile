FROM node:16.10.0

WORKDIR /desafioprecato

COPY package*.json ./

COPY wait-for-it.sh /wait-for-it.sh

RUN npm install

COPY . .

EXPOSE 3000

RUN chmod +x ./wait-for-it.sh

CMD ["node", "server.js"]
