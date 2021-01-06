FROM node:14-alpine
USER root
EXPOSE 5432/TCP

RUN netstat -lntu