#Multi Phase Docker FIle
FROM node:alpine as builder
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx as runner
#We need to put the static content into /usr/share/nginx/html for nginx
COPY --from=builder /app/dist /usr/share/nginx/html
#nginx starts automatically after this !