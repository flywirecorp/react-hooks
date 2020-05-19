FROM node:14.2.0

COPY action.sh /action.sh

ENTRYPOINT ["/action.sh"]
