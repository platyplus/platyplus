#!/bin/sh
# * docker.sh <build|push> <app-name>
# TODO only for last commit!!

ORG=platyplus
DOCKERFILE=apps/$2/Dockerfile
VERSION=$(git describe --tags HEAD | grep charts-$2@ | awk -F @ '{ print v$2 }')
IMAGE=$ORG/$2
LATEST_TAG=$IMAGE:latest

case $1 in
  "build") 
    docker build . -f $DOCKERFILE -t $LATEST_TAG
    if [ -n "$VERSION" ]; then
      docker tag $LATEST_TAG $IMAGE:$VERSION
    fi
    ;;
  "push") 
    docker push --all-tags $IMAGE
  ;;
   *) echo "unknown command" ;;
esac

