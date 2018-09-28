#!/bin/bash

TSLINT="$(git rev-parse --show-toplevel)/src/GeoPing.FrontEnd/node_modules/.bin/tslint"

for file in $(git diff --cached --name-only | grep '\.tsx\|\.ts\?$')
do
        git show ":$file" | "$TSLINT" "$file"
        if [ $? -ne 0 ]; then
                exit 1
        fi
done