FROM node:22-alpine AS build 

WORKDIR /app

COPY ./package.json ./package-lock.json ./

RUN npm install

COPY . .

RUN npm run build --prod

# Etapa 2

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=BUILD /app/dist/passeio-app/ /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT nginx -g 'daemon off;'