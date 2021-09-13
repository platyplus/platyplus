#!/bin/bash
PROJECT=$1
BASE=$2
HEAD=$3

PROJECTS=$(yarn nx print-affected --base $BASE --head $HEAD --select="projects")
if [[ ",$PROJECTS," = *",$y,"* ]]; then
    exit 1
else
    exit 0
fi