FROM nginx:alpine
COPY --chown=nginx:nginx dist/apps/platyplus /usr/share/nginx/html
COPY tools/nginx.conf /etc/nginx/nginx.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]
