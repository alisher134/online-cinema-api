FROM node

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

COPY .env .env ./

RUN yarn prisma generate

RUN yarn prisma db push

RUN yarn build

EXPOSE 8080

CMD [ "yarn", "prod" ]