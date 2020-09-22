#!/bin/sh
CURRENT_BRANCH=$(git branch --show-current)

helm package charts/* --dependency-update --destination charts
git checkout charts
git checkout $CURRENT_BRANCH
