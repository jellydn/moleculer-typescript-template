FROM mhart/alpine-node:14

ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

CMD ["npm", "start"]
