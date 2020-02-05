FROM node:8 as builder
ADD ./ /src
WORKDIR /src
RUN npm install --production
RUN mv node_modules prod_node_modules
RUN npm install
RUN npm run compile

FROM node:8-alpine
COPY --from=builder /src/build/src /app
COPY --from=builder /src/prod_node_modules /app/node_modules
COPY --from=builder /src/package.json /app
WORKDIR /app
RUN chown -R node:node /app
USER node
CMD ["npm", "run", "start"]
