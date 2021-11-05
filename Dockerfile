FROM node:14
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/package.json
RUN npm install -g @vue/cli
RUN npm install
EXPOSE 8080
COPY . .
CMD ["npm", "run", "serve"]