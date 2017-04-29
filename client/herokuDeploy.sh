#!/usr/bin/env bash

npm run build
git add build
git commit -m "Deploying fe"
git push heroku master
