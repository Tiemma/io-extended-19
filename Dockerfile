FROM node:8-alpine

# Use this to dynamically configure DEBUG FLAGS
#ARG DEBUG_FLAGS
#ENV DEBUG=$DEBUG_FLAGS

# Only added for documentation, null on purpose!
ENV DEBUG="io-extended-19:server"
ENV PORT=""

WORKDIR /index

ADD . .
RUN npm install --production

CMD ["npm", "run", "start"]