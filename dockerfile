FROM node:gallium

# Install redis
# RUN apt install sudo
# RUN sudo dpkg -i apt.deb
# RUN apt-get update && apt-get install -y redis-server

WORKDIR /app
COPY package.json .
RUN npm install -f
COPY . .
RUN npm run build

# EXPOSE 6379
EXPOSE 3000

CMD ["npm", "start"]