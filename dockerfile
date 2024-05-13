FROM node:latest
COPY . .
RUN npm install
EXPOSE 5900
CMD [ "npm","start" ]