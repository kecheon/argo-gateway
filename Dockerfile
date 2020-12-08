FROM node:14
ENV HOST localhost
ENV PORT 3000

RUN npm config set registry http://registry.npmjs.org/

RUN mkdir -p /usr/src/app/secondappbackend
WORKDIR /usr/src/app/secondappbackend

COPY ./secondappbackend/package.json .
RUN npm install && \
	npm cache clean --force

WORKDIR ../
RUN git clone -b docker https://github.com/kecheon/argo.git

WORKDIR argo/ui
RUN npm install && \
	npm cache clean --force
RUN npm run build 

WORKDIR ../../
COPY . /usr/src/app

WORKDIR secondappbackend

EXPOSE 3000

CMD ["node", "app.js"]
