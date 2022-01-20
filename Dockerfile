FROM node:8

ADD ./package.json ./package.json
RUN npm install -g typescript && npm i
COPY ./ ./
RUN tsc
RUN cp -r src/config build/

EXPOSE 4100

ENTRYPOINT node build/bin/index