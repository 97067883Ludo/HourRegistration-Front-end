FROM node:22-slim AS build-stage

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY Hourregistration/package.json Hourregistration/package-lock.json* ./Hourregistration/
RUN npm install --prefix Hourregistration

COPY Hourregistration/ ./Hourregistration/
RUN npm run build --prefix Hourregistration

FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /app/Hourregistration/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
