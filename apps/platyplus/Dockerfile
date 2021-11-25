FROM nginx:alpine
COPY dist/apps/platyplus /app
COPY tools/nginx.conf /etc/nginx/nginx.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]
