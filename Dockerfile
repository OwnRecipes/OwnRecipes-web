FROM node:16.15-alpine

WORKDIR /code

ENV DISABLE_ESLING_PLUGIN=true

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --no-audit

COPY . ./

CMD ["npm", "start"]
