# to run a project i need some base ie node
# or FROM node:20 // to set any version
FROM node


# working directries which has all my files
WORKDIR /app

# COPY source dest// we have ignored the node_modules
COPY . .


RUN npm install

# EXPOSE port
EXPOSE 3000


# RUN npm start
CMD [ "npm","start"]

