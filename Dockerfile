FROM node as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build

FROM astefanutti/scratch-node

COPY --from=builder /app /

EXPOSE 3000

ENTRYPOINT ["node", "app.js"]