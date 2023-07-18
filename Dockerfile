FROM node as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build

RUN rm -rf node_modules

RUN npm install express

FROM astefanutti/scratch-node

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000

ENTRYPOINT ["node", "app.js"]