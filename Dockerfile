FROM node as BUILD_IMAGE
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build

FROM nginx as PRODUCTION_IMAGE
COPY --from=BUILD_IMAGE /app/dist /usr/share/nginx/html
EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]