FROM node:16 as front

WORKDIR /usr/app/

COPY . .

RUN npm install --force

COPY . .

RUN npm run build

EXPOSE 8081

FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=front /usr/app/nginx.conf /etc/nginx/nginx.conf
COPY --from=front /usr/app/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
# CMD ["npm", "run", "start"]