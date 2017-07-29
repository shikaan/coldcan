FROM node:alpine

MAINTAINER Manuel Spagnolo (shikaan) <spagnolo.manu@gmail.com> 

RUN ["apk", "update"]

RUN ["apk", "add", "ffmpeg"]

COPY ./server .

ADD package.json .

RUN ["npm", "install"]

EXPOSE 80:3000

RUN ["npm", "start"]