FROM node:14
ENV HOST localhost
ENV PORT 3000

RUN npm config set registry http://registry.npmjs.org/

RUN mkdir -p /usr/src/app/secondappbackend
WORKDIR /usr/src/app/secondappbackend

COPY ./secondappbackend/package.json .
RUN npm install && \
	npm cache clean --force

WORKDIR /usr/src/app
RUN git clone -b docker https://github.com/kecheon/argo.git

WORKDIR /usr/src/app/argo/ui
RUN npm install && \
	npm cache clean --force
RUN npm run build 

WORKDIR /usr/src/app
COPY . .

WORKDIR /usr/src/app/secondappbackend

EXPOSE 3000

CMD ["node", "app.js"]