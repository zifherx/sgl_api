FROM debian:bullseye as builder

ARG NODE_VERSION=14.19.0

RUN apt-get update; apt install -y curl
RUN curl https://get.volta.sh | bash
ENV VOLTA_HOME /root/.volta
ENV PATH /root/.volta/bin:$PATH
RUN volta install node@${NODE_VERSION}

RUN mkdir /app
WORKDIR /app

ENV NODE_ENV production

COPY . .

RUN npm install --production=false && npm run build
FROM debian:bullseye

LABEL fly_launch_runtime="nodejs"

COPY --from=builder /root/.volta /root/.volta
COPY --from=builder /app /app

EXPOSE 3001

WORKDIR /app

ARG PASS_BD=Timba2020
ENV NODE_ENV production
ENV MONGO_URI sglcluster2021.a2wup.mongodb.net/bd-sgl-database
ENV MONGO_USERNAME zifher
ENV MONGO_PASSWORD ${PASS_BD}
ENV PATH /root/.volta/bin:$PATH

CMD [ "npm", "run", "start" ]