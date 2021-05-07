#!/bin/sh     
git pull origin main
cd server
npm install
cd client
npm install
npm run-script build
cd ../server
sudo systemctl restart nginx
sudo pm2 restart all