FROM node
WORKDIR /server/services/users
COPY package.json package-lock.json /usr/local/app/
RUN npm install && npm cache clean --force
COPY ./ ./
CMD ["npm", "run", "start"]