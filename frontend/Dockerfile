FROM node:latest

ENV PROJECTDIR /otis

WORKDIR $PROJECTDIR

COPY package*.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]