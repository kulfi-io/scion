FROM node:14-alpine:latest
USER root
EXPOSE 5432/TCP

RUN netstat -lntu