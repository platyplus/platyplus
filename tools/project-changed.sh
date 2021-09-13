#!/bin/bash
PROJECT=$1
BASE=$2
HEAD=$3

PROJECTS=$(nx print-affected --base $BASE --head $HEAD --select="projects")
if [[ ",$PROJECTS," = *",$y,"* ]]; then
    exit 0
else
    exit 1
fi