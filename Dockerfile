FROM node:latest
COPY . ./app
RUN cd ./app && yarn install && yarn build
EXPOSE 3000
ENTRYPOINT [ "node ./dist/server.js" ] 