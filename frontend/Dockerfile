FROM node:20-alpine3.18
LABEL maintainer="Douglas Silvio Correa <me@douglascorrea.io>"

WORKDIR /side-stacker
COPY ./side-stacker/package.json /side-stacker
RUN npm install
COPY ./side-stacker /side-stacker
#RUN adduser \
#        --disabled-password \
#        react-user

EXPOSE 3000
#USER react-user