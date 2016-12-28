#!/bin/bash

if [ "$1" == "init" ]
then
    git checkout master
elif [ "$1" == "pull" ]
then
    git checkout master
    git pull origin master
    git pull origin master
    git merge master
elif [ "$1" == "commit" ]
then
    git add --all
    git commit -m "$2" -a
    git push origin master
fi
