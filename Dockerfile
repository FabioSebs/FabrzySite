FROM node:slim

WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN yarn

COPY . .

CMD ["yarn" , "dev"]

EXPOSE 3000
