#!/bin/sh
# * docker.sh <build|push> <app-name>
# TODO create an Nx executor
# TODO will only for last commit

ORG=platyplus
WORKING_DIR=apps/$2
DOCKERFILE=$WORKING_DIR/Dockerfile
# TODO make it fail if tag is not found
VERSION=$(git tag --contains HEAD 2>/dev/null | grep ^$2@ | awk -F @ '{ print v$2 }')
REPOSITORY=$ORG/$2
LATEST_TAG=$REPOSITORY:latest

case $1 in
  "build") 
    docker build . -f $DOCKERFILE -t docker.io/$REPOSITORY
    echo "tag: docker.io/$LATEST_TAG"
    docker tag $REPOSITORY docker.io/$LATEST_TAG
    if [ -n "$VERSION" ]; then
      echo "tag: docker.io/$REPOSITORY:$VERSION"
      docker tag $REPOSITORY docker.io/$REPOSITORY:$VERSION
    fi
    ;;
  "push") 
    echo "docker push --all-tags docker.io/$REPOSITORY"
    docker push --all-tags docker.io/$REPOSITORY
    # TODO doesn't work with GH Action -> when the 'publish' action becomes meant for one single tag, move to a GH action step
    # DESCRIPTION=$(jq -r '.description // "" | select(. != "") // ""' $WORKING_DIR/package.json)
    # echo "Pushing description: $DESCRIPTION"
    # docker run -a stderr -v $PWD/$WORKING_DIR:/workspace \
    #   -e DOCKERHUB_USERNAME="$DOCKERHUB_USERNAME" \
    #   -e DOCKERHUB_PASSWORD="$DOCKERHUB_PASSWORD" \
    #   -e DOCKERHUB_REPOSITORY=$REPOSITORY \
    #   -e README_FILEPATH='/workspace/README.md' \
    #   -e SHORT_DESCRIPTION="$DESCRIPTION" \
    #   peterevans/dockerhub-description:2
  ;;
   *) echo "unknown command" ;;
esac

