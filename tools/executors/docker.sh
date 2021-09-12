#!/bin/sh
# * docker.sh <build|push> <app-name>
# TODO only for last commit!!

ORG=platyplus
WORKING_DIR=apps/$2
DOCKERFILE=$WORKING_DIR/Dockerfile
VERSION=$(git describe --tags HEAD | grep charts-$2@ | awk -F @ '{ print v$2 }')
REPOSITORY=$ORG/$2
LATEST_TAG=$REPOSITORY:latest
env
echo $TEST_ENV
echo $DOCKERHUB_USERNAME
echo $DOCKERHUB_TOKEN
echo $TEST_ENV_END

case $1 in
  "build") 
    docker build . -f $DOCKERFILE -t $LATEST_TAG
    if [ -n "$VERSION" ]; then
      docker tag $LATEST_TAG $REPOSITORY:$VERSION
    fi
    ;;
  "push") 
    docker push --all-tags $REPOSITORY
    # TODO description from package.json
    DESCRIPTION=$2
    docker run -v $PWD/$WORKING_DIR:/workspace \
      -e DOCKERHUB_USERNAME=$DOCKERHUB_USERNAME \
      -e DOCKERHUB_PASSWORD=$DOCKERHUB_TOKEN \
      -e DOCKERHUB_REPOSITORY=$REPOSITORY \
      -e README_FILEPATH='/workspace/README.md' \
      -e SHORT_DESCRIPTION=$DESCRIPTION \
      peterevans/dockerhub-description:2
  ;;
   *) echo "unknown command" ;;
esac

