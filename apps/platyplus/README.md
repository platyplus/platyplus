# Frontend Docker image

This image wraps the code built with Webpack into Nginx image. No rocket science.

As the frontend is a static file, it is very possible to consider moving this container out of the Kubernetes cluster, for instance to ship it on a provided sur as Netlify of AWS Amplify.

To that end, it is possible to extract the static files instead of building them from Platyplus' source code:

```sh
docker run -d --name platyplus_temp platyplus/platyplus:latest
docker cp platyplus_temp:/app static_site
docker rm platyplus_temp
```

Docker images are available on [Docker Hub](https://hub.docker.com/repository/docker/platyplus/platyplus)
