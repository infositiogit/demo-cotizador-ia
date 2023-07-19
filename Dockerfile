FROM node:14.15-alpine3.12

RUN apk add --no-cache python2

WORKDIR /app

COPY . .

RUN npm install -g @angular/cli@14.2.12 && npm install

EXPOSE 4200

CMD ["npm", "start"]
