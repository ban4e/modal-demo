FROM node:15-alpine3.10

ENV APP_ROOT /app
ENV HOST=0.0.0.0
ENV PORT=3000

# create destination directory
RUN mkdir -p ${APP_ROOT}
WORKDIR ${APP_ROOT}

# copy the app
COPY . .
