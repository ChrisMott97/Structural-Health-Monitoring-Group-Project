# Install Guide
This guide will overview how to use Docker to run the application.

## Docker Installation
Docker and Docker Compose are required to run this application.
Docker and Docker Compose installation is fairly straightforward. The installation for this has been tested on Ubuntu 20.04 as per the following guides:
1. https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04
2. https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04

Installation for other operating systems can be found here: https://docs.docker.com/engine/install/ and https://docs.docker.com/compose/install/ . 
### Important note for newer installations of Docker and Docker Compose
All commands in this document will use the `docker-compose` command, however the newest versions of Docker Compose that were introduced during this project utilise the `docker compose` command. The only real difference is the base command as all arguments should still work the same.

All commands below should be executed while the command line or terminal is in the project directory that contains the [`docker-compose.yml`](../docker-compose.yml) file. The `docker-compose` command is used to interact with containers defined in a `docker-compose.yml` file.

The default `docker-compose.yml` file is used for development, and while it could be used for production, the `docker-compose.prod.yml` file is designed for production. All `docker-compose` commands will have the `-f docker-compose.prod.yml` argument to ensure the production file is being used. If any given command does not run, the command should have `sudo` added to the start, for example `docker-compose up` would become `sudo docker-compose up`.

The main command to start the application is:
```
docker-compose -f docker-compose.prod.yml up -d
```
this will start every service defined in the `docker-compose.prod.yml` file as follows:
- the web container will be run with port 3030 which should be accessible at http://fsdl-mon-2.ex.ac.uk:3030 
- the internal-database container will be run with port 33061 and should be accessible by the application and inspectable using the Adminer instance at http://fsdl-mon-2.ex.ac.uk:8080, where the server type is Postgres, the the username and password are "root" and "example", and the host is internal-database. The reason host is internal-database is that this is the internal name used by Docker for this service. Using Docker Compose allows containers to network with each other using this internal domain name network.

The logs for the application can be viewed in real-time using
```
docker-compose -f docker-compose.prod.yml logs -f
```
this will show the logs for all the containers running, where `-f` stands for follow and allows the logs to continue showing in real time.

Finally, the application can be stopped with
```
docker-compose -f docker-compose.prod.yml down
```

## Running the machine learning
The machine learning can be triggered by going to http://fsdl-mon-2.ex.ac.uk:5000

## Authentication
Authentication is managed by the external provider [Auth0](https://auth0.com/). Most of the user management can be managed within the application itself, however additional functionality and for transparency, access directly to the Auth0 platform is provided here. The Auth0 associated account can only be accessed via the provisioned Gmail account. The Gmail account for this application is `exetercivil@gmail.com` with password `humber_bridge`. Using these details via the Login With Google button on the [Auth0 website](https://manage.auth0.com), all the user management can be accessed.

As this user database is being used for both development and production, extreme care should be taken to ensure production users aren't affected. The default login for the actual application is:
- Email: exetercivil@gmail.com
- Password: Exeter123

