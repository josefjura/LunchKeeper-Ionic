FROM node:8.9-alpine
ENV NODE_ENV production
ENV USER=app
ENV SUBDIR=appDir

#RUN npm install --global typescript
ENV HOME=/home/${USER}
ENV ZOMATO_API_KEY=7801edd0712e8d74b9947053e48a9f1a


RUN npm i -g typescript

#COPY package.json package-lock.json tsconfig.json /
COPY . $HOME/$SUBDIR

WORKDIR $HOME/$SUBDIR

RUN npm install --production
RUN tsc
#RUN tsc
EXPOSE $PORT

CMD [ "node", "dist/server.js" ]