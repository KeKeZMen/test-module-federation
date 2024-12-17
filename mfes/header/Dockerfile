FROM node:alpine

WORKDIR /usr/app/src

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "preview"]