# NodeDocker

# In this tutorial, i will make a mern stack app with: 
+ Backend: Nodejs, express js (for rest api)
+ Frontend: Reactjs
+ Database: RDBMS Postgres SQL (In this tutorial I will use a vps server with postgres pre-installed (You can use your own postgres images if you like))
+ Docker and docker compose

# Required:
- Install lastest version NodeJs at https://nodejs.org/en/ 
- Visual Studio Code IDE
- Install docker desktop (Macos/Windows/Linux) at https://www.docker.com/get-started

# PART 1: Dockerize a simple app using docker compose
1. Why docker ?
- Docker is a platform that provides an easier way to build, deploy and run applications using containers (on a virtualization platform). 
- Benefit of using docker: 
+ Build once, run anywhere (you can setting command at Dockerfile to download images, package, lib , database tool, etc... at any OS)
+ Docker container is very light and fast, you can create and run docker container in seconds.  
+ Easily test apps on another operating system.
+ You can break down the functionality of your application into individual containers. The Database example runs on one container and the FE can run on another while the Node.js application runs on another. With Docker, it is very easy to link containers together to form an application, making it easy to scale and update components independently of each other.
+ Emulate the environment on the server under the local machine: using Docker will allow users to completely simulate a new server environment under the local machine quickly and perfectly.


![image](https://user-images.githubusercontent.com/48196420/142556952-7791ed73-9b87-4e4d-ba5d-0dfcb9af1d09.png)

- Docker consists of the following four main components:: 
+ docker engine (Docker Container is actually a virtual machine and executes Docker Image commands to create a Container that holds all the necessary packages to start and run the application.)
+ docker images (Docker Image can be an image file, a file of a platform, a language or an operating system, etc. The images are shared publicly at Docker Hub so that everyone can use and develop together. . )
+ docker container (is an instance of an image. You can create, start, stop, move or delete containers based on Docker API or Docker CLI.)
+ docker hub (This is a cloud service capable of sharing applications. It allows users to pull/push operations with images similar github)

Read more about docker at: https://docs.docker.com/

2. Development
- Initalize simple Nodejs app with express framework. Create 'NodeDocker' folder and run this code from a terminal with current path:

```
mkdir server
cd server
npx --package express-generator express
cd -
code .
```
Result:
![image](https://user-images.githubusercontent.com/48196420/143208891-ba6e0a56-0b3e-40a6-a0fb-85a6e76bbc06.png)


- Express framework will create a framework for our project that looks like this:
Includes: Routes, view engine for render html, css... , app.js (config of project (similar .Net startup file)), public folder contain css, js, ... etc and folder bin (this folder is important from 4.x version of express)

- Run simple with dev tool (you can stop running app with command: Ctrl + C or Control + C):

+ Install package with npm and running app (default port 3000): 
```
cd server
npm i
npm start
```

Result: 
![image](https://user-images.githubusercontent.com/48196420/142559358-141e4971-9787-4018-9b8e-fa12cf050b43.png)

+ You already have a basic SSR application with node js built using express framework. Next we will create a react application in a folder called client. Stop node server (Command + C or Ctrl + C) and open new terminal and run:

```
mkdir client
cd client
npx create-react-app .
```

Result:
![image](https://user-images.githubusercontent.com/48196420/143210545-3ad9f5e1-b85a-4f00-8107-51854f74ac3b.png)

+ Try run your client app with new terminal:
```
cd client
npm start
```

Result:
![image](https://user-images.githubusercontent.com/48196420/143210912-54658e62-9dd1-4d7c-bbdf-c1b839b77ec2.png)

+ Your client app work fine at http://localhost:3000/

3. Implement with docker and docker-compose:

-  Fist, By default node server port is 3000. We will change it to port 5000 in server/bin/www.

-  Second, We need create Dockerfile to create image and something else. Open new terminal and run:
```
cd client
touch Dockerfile
cd -
cd server 
touch Dockerfile
```
These commands will initialize empty Dockerfiles so that we can set the command lines to run for each container. Each Dockerfile will create a separate image

- Well, add the following commands to the Dockerfile you created:

server:

```
FROM node:12.18.3

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . .

CMD ["node", "./bin/www"]
```

client: 
```
FROM node:12.18.3

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . .

CMD ["npm", "start"]
```
+ Explain:

```FROM node:12.18.3``` determines the node version to install

```WORKDIR```: declares the working directory for the directives: RUN, CMD, ENTRYPOINT, COPY and ADD

```RUN``` executes command line commands and a new layer

```COPY```: Copy files from the current directory into the container

```EXPOSE```: Docker expose is the act of redirecting the port of the docker container to the port of the host containing the container.

```CMD```: executes default command when we initialize container from image


You have added the necessary commands to create the image and launch the container. Now open docker desktop and let's try to create the images with the following commands:

```
cd client 
docker build -t docker-client .
cd -
cd server 
docker build -t docker-server .
```

Your docker desktop will create 2 images named 'docker-client' and 'docker-server':

![image](https://user-images.githubusercontent.com/48196420/143215642-10f3bb65-3b8c-4e7a-b304-e003545b5f95.png)

+ Run your images: ```docker run -d --name [container-name]  [image]``` . We will run on background with -d tag. 

Run client image:

```
docker run -dp 3000:3000 --name client-container  docker-client
```
Your client is running at http://localhost:3000/:
![image](https://user-images.githubusercontent.com/48196420/143222954-b8a2c174-bea0-404e-b071-51f722cecc1b.png)

Run server image:

```
docker run -dp 5000:5000 --name server-container  docker-server
```

Your client is running at http://localhost:5000/:
![image](https://user-images.githubusercontent.com/48196420/143223676-fc3380c4-0228-4381-a55f-a0615dab530b.png)

Open the server-container and you will see that the api called from port 5000 in the host is mapped to port 5000 in the container:
![image](https://user-images.githubusercontent.com/48196420/143224858-46494af9-7b20-4f56-801e-9079ac5b522a.png)

+ Some common docker commands:

```docker ps``` : Lists running containers. Add '-a' to see more exited containers.

```docker stop [container_id]```: Stop the container.

```docker rm [container_id]``` and ```docker rmi [image_name]```: delete container and image (Make sure your container is stopped before deleting).

Use ```docker help``` to search other docker command lines

Learn more at: https://docs.docker.com/engine/reference/commandline/cli/

4/ Communicate application components
- Test simple api generate from express with postman or thunder. Let's run server and try this api: 

Result and log:
![image](https://user-images.githubusercontent.com/48196420/143259937-22df359d-f3f4-4cf9-9a55-a7a82774e9ff.png)

![image](https://user-images.githubusercontent.com/48196420/143260037-2344358e-6afb-4406-b59e-a0b4399d852a.png)

- Stop all containers and make some changes to the communication between client and server.

Install some package
+ Nodemon: Update the change of nodejs source code. We won't need to re-run the server every time we change the code. In script section at /server/package.json. Modify start script to ```"start": "nodemon --watch routes ./bin/www"```. Try modify api get user and look at your terminal ^^.

+ Cors: Very important if you want call api and get response from server.

+ Dotenv: You will need it to read environment variables. Example : ```NAME=abc``` and you can get value by: ```var a = process.env.NAME //abc```

+ Proxy: for development env to mapping port client and server

Run command:

```
cd server
npm i nodemon
npm i cors
npm i dotenv
```
Open app.js and add:
```
var cors = require('cors');
app.use(cors());
```

+ Docker-compose: We will make the FE and BE components communicate with each other through the docker-compose initialization script. We've made some changes to FE and BE. You can download the complete repo here: https://github.com/ThanhDeveloper/NodeDocker. To track changes and apply to your project: https://github.com/ThanhDeveloper/NodeDocker/pull/1. Please ```npm install``` at client and server.

Open package.json of client folder. You can change to http://server:5000 for running on container and http://localhost:5000 for running out side container.

Open project and look at docker-compose.yml. Docker compose is a tool used to define and run multi-containers for Docker applications. With compose you use the YAML file to configure the services for your application. Let's learn the commands inside: 
```
version: '3'

services:
  server:
    env_file:
        "./server/.env"
    build:
      context: ./server
      dockerfile: ./Dockerfile
    image: "thanhnt/server-side"
    ports:
      - "5000:5000" 
  client:
    build: 
      context: ./client
      dockerfile: ./Dockerfile
    image: "thanhnt/client-side"
    ports:
      - "3000:3000"
    links:
      - "server"
```

We will build 2 image with name thanhnt/server-side and thanhnt/client-side and specify the directory containing the Dockerfile to build the your application. We will specify client port as 3000, server port as 5000 and show client dependency by linking to server service.

+ We will add .env file to setting global env variables. We will use it to set my database login credentials:

```
cd server
touch .env
```
Modify env like this:
```
PGUSER=node_user
PGHOST=103.82.20.100
PGDATABASE=test
PGPASSWORD=node_user
PGPORT=5432
```

![image](https://user-images.githubusercontent.com/48196420/143269144-aa031acd-405e-459e-8bed-54c58c48a6cd.png)

+ Run docker-compose:
```
docker-compose up -d 
```










