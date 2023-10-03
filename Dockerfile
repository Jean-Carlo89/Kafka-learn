FROM node:20-slim


WORKDIR /home/node/app

USER node

RUN npm i

CMD [ "tail", "-f", "/dev/null" ]