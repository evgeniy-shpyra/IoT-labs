FROM node:20.11.1

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY src src 
COPY data data 
COPY .env .env 

CMD ["node", "src/main.js"]