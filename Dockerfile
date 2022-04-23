FROM node:16 as builder
WORKDIR /app
COPY package.json package-lock.json tsconfig.json /app/
RUN npm install

FROM node:16
WORKDIR /app
COPY --from=builder /app .
COPY . .
RUN npm run build
CMD ["node", "dist/index.js"]