#!/bin/sh
# * docker-build.sh <app-name>
# TODO only for last commit!!
ORG=platyplus
DOCKERFILE=apps/$1/Dockerfile
VERSION=$(git describe --tags HEAD | grep charts-$1@ | awk -F @ '{ print v$2 } END { if (!NR) print "latest" }')
TAG=$ORG/$1:$VERSION
docker build . -f $DOCKERFILE -t $TAG
