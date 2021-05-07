#!/bin/sh
cd client/
npm run-script build
cd ../server
npm start