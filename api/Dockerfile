FROM node:8.9-alpine
ENV NODE_ENV production
ENV USER=app
ENV SUBDIR=appDir
ENV HOME=/home/${USER}
COPY package.json package-lock.json ./ $HOME/$SUBDIR/
WORKDIR $HOME/$SUBDIR
RUN npm install --production --silent && mv node_modules ../
EXPOSE $PORT
