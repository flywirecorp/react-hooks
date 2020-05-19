FROM node:alpine

COPY action.sh /action.sh

ENTRYPOINT ["/action.sh"]
