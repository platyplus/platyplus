FROM nginx:latest
COPY dist/apps/platyplus /usr/share/nginx/html
COPY tools/nginx.conf /etc/nginx/nginx.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]
