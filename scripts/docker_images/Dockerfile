# Phase 1: Install dependencies
FROM node:alpine as builder

WORKDIR '/app'
COPY package.json .
RUN npm install
# Add any additional steps for your final image
