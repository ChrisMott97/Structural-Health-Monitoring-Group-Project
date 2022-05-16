# Docker
## Concepts
1. Docker **images**:
   - are a reproducible set of instructions to make a container
   - are initially defined by a premade image from a registry like [DockerHub](https://hub.docker.com/search?type=image)
   - are customised further by a [`Dockerfile`](../web/Dockerfile)
2. Docker **containers**:
   - isolate a service and includes every required dependency
   - are ephemeral - by default, restarting the container resets everything about the container
3. Docker **volumes and bind mounts**:
   - allow storage to be saved between restarts such as live changing code or configuration files
   - volumes are stored and managed by Docker and are not easily accessible by a user
   - bind mounts are stored in a location of the user's choice and are more suitable for code
4. Docker **networks**:
   - allow containers to be interacted with from the host
   - allow containers to interact with eachother via an internal DNS server
     - e.g. a web interface database manager such as Adminer on one container can reach another service like the database server via its service name in the `docker-compose.yml` file.
5. Docker Compose
   - `docker-compose.yml` files allow multiple containers to be built and run at once networked together.

## Installation
Docker and Docker Compose installation is fairly straightforward. The installation for this has been tested on Ubuntu 20.04 as per the following guides:
1. https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04
2. https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04

Installation for other operating systems can be found here: https://docs.docker.com/engine/install/ and https://docs.docker.com/compose/install/ . 

### Important note for newer installations of Docker and Docker Compose
All commands in this document will use the `docker-compose` command, however the newest versions of Docker Compose that were introduced during this project utilise the `docker compose` command. The only real difference is the base command as all arguments should still work the same.

## Commands
All commands below should be executed while the command line or terminal is in the project directory that contains the [`docker-compose.yml`](../docker-compose.yml) file. The `docker-compose` command is used to interact with containers defined in a `docker-compose.yml` file.
1. Start specific services `external-database` and `database-ui`.
   
   ```
   docker-compose up -d external-database database-ui
   ```
   - `up` starts containers based on the specification in `docker-compose.yml`
   - `-d` starts them in the background so the terminal can be used for other things - if this is not used, `Ctrl-C` can be used to terminate the services
   - `external-database` and `database-ui` are services defined in `docker-compose.yml`, any number can be added to this command - **if there are none, all services start**
2. Stop containers that may have started from `docker-compose.yml` but are in the background due to `-d`
    ```
    docker-compose down
    ```
    - still retains any data that has been marked to be saved in the `volumes` sections of the `docker-compose.yml`
3. Stop containers but remove all saved data (start from scratch)
   ```
    docker-compose down -v
   ```
   - removes *most* saved data, may need to manually remove folders that are linked to the container
4. See logs of running containers that have been detached with `-d`
   ```
   docker-compose logs -f
   ```
   - `-f` is short for `--follow` and allows new logs to keep showing while in this view
   - Terminating the process with `Ctrl-C` here will only close the log window, **not terminate the services**
5. In order to run commands inside a running container, `exec` can be used
   ```
   docker-compose exec web npm test
   ```
   - `web` is an example container to execute a command in
   - `npm test` is the example command to run
   - this is the primary method to run tests for the web container
6. `run` is much like `exec` except it does not require the container to be running beforehand
   ```
   docker-compose run web npm install new_dependency
   ```
   - `npm install new_dependency` is the example command here
   - this is the primary method for adding a new dependency

7. Sometimes new dependencies will not register with the app, there are two commands to mitigate this:
   ```
   docker-compose down -v
   docker-compose build web
   ```
   - the first command brings down the containers and removes any volumes, this helps remove the node_modules cache
   - the second command forces the container to rebuild and consider the new `package.json` file.

## Accessing the running instances
All the ports that are exposed are documented in the `docker-compose.yml` file [here](../docker-compose.yml).
- the main web module can be accessed at http://localhost:3030
- the internal database is exposed with port 33062
- the external development database is exposed with port 33061
- the adminer database manager instance can be found at http://localhost:8080

## Authentication
Authentication is managed by the external provider [Auth0](https://auth0.com/). Most of the user management can be managed within the application itself, however additional functionality and for transparency, access directly to the Auth0 platform is provided here. The Auth0 associated account can only be accessed via the provisioned Gmail account. The Gmail account for this application is `***REMOVED***` with password `humber_bridge`. Using these details via the Login With Google button on the [Auth0 website](https://manage.auth0.com), all the user management can be accessed.

As this user database is being used for both development and production, extreme care should be taken to ensure production users aren't affected. The default login for the actual application is:
- Email: ***REMOVED***
- Password: ***REMOVED***

## Data Import
### Overview 
1. The MySQL and Postgres containers runs any `.sql` files that it has in `/docker-entrypoint-initdb.d` folder within the container.
2. To put files in this directory, a volume has been made with 
   ```yaml
    volumes:
      - ./external-database/init:/docker-entrypoint-initdb.d
   ```
   ```yaml
    volumes:
      - ./internal-database/init:/docker-entrypoint-initdb.d
   ```
   the volume puts files from the local `init` directory inside `external-database` folder into the entrypoint directory in the container.
3. The container only runs the `.sql` files on the first instance.
