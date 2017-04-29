#!/bin/bash
cd client
npm i
rm -rf node_modules/@types/react

cd ../server
npm i
npm run-script dev-start
