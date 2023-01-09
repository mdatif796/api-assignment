FROM node:lts-alpine
ENV NODE_ENV=production
ENV DATABASE_PASS=Atif_db
ENV MONGO_USER=Admin-Atif
ENV MONGO_DATABASE=api-assignment
ENV JWTSECRETKEY=secret
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 8000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
