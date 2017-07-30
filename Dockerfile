FROM node:alpine

MAINTAINER Manuel Spagnolo (shikaan) <spagnolo.manu@gmail.com> 

RUN ["apk", "update"]

RUN ["apk", "add", "ffmpeg"]

ADD server ./server

ADD package.json .

ADD yarn.lock .

ADD configuration.json .

RUN ["yarn", "install"]

EXPOSE 80:3000

CMD ["npm", "start"]