# Car renting application
Car rent information system

### Deployment
OS: Debian 12

1. Upgrade the system:
   ```
   apt update && apt upgrade -y
   ```
2. Install NodeJS through NVM:
   ```
   apt install build-essential libssl-dev
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
   source ~/.bashrc
   nvm install 14.15.4
   nvm use 14.15.4
   ```
3. Clone the repository and install dependencies:
   ```
   git clone https://github.com/Eoic/car-rent.git
   cd car-rent
   npm run build
   ```
4. Install NodeJS process manager and start the server:
   ```
   npm install pm2 -g
   pm2 start server.js --name "rajesas-car-rent"
   pm2 startup systemd
   pm2 save
   ```
6. Install UFW and open ports:
   ```
   apt install ufw
   ufw allow 22
   ufw allow 80
   ufw allow 443
   ```
7. Install Nginx:
   ```
   apt install nginx
   systemctl enable --now nginx
   ```
8. Configure Nginx:
   ```
   nano /etc/nginx/sites-available/default
   ```

   Replace file contents with the following:
   ```
   server {
     server_name rajesas-nuoma.lt www.rajesas-nuoma.lt;

     location / {
       proxy_pass http://localhost:5000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

   Restart Nginx:
   ```
   systemctl reloand nginx
   ```
