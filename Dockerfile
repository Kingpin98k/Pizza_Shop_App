#Multi Phase Docker FIle
FROM 642303465584.dkr.ecr.ap-south-1.amazonaws.com/docker_pizza_config_container:latest as builder
WORKDIR '/app'
COPY . .
RUN npm run build

FROM nginx as runner

#This will map the 80 port direclty to the elastic beanstalk
EXPOSE 80

#We need to put the static content into /usr/share/nginx/html for nginx
COPY --from=builder /app/dist /usr/share/nginx/html
# #nginx starts automatically after this !