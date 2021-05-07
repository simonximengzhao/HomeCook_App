  
#!/bin/sh
git pull origin main
cd server
npm install
cd client
npm install
npm run-script build
cd ../server
npm start