FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
RUN test -n "$REACT_APP_API_BASE_URL" || \
  (echo "REACT_APP_API_BASE_URL build argument is required" && exit 1)
RUN npm run build

FROM nginx:1.27-alpine AS runtime
ENV PORT=80

COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- "http://127.0.0.1:${PORT}/" >/dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]
