# Docker
## Concepts
1. Docker **images**:
   - are a reproducible set of instructions to make a container
   - are initially defined by a premade image from a registry like [DockerHub](https://hub.docker.com/search?type=image)
   - are customised further by a [`Dockerfile`](../api-gateway/Dockerfile)
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

## Extra
 - Example using Docker for Python data science [here](https://towardsdatascience.com/hands-on-guide-to-docker-for-data-science-d5d1f6f4a326)

## Mass Data Import
### Overview 
1. The MySQL container runs any `.sql` files that it has in `/docker-entrypoint-initdb.d` folder within the container.
2. To put files in this directory, a volume has been made with 
   ```yaml
    volumes:
      - ./external-database/data:/var/lib/mysql
      - ./external-database/init:/docker-entrypoint-initdb.d
   ```
   the first volume keeps the database data saved, the second puts files from the local `init` directory inside `external-database` folder into the entrypoint directory in the container.
3. The container only runs the `.sql` files on the first instance.
### Instructions
1. `cd` to the project folder and `docker-compose down -v` as explained in the Commands section above
2. Remove the `external-database/data` bind-mount folder - both of these steps will reset the container
3. Place the `humber_bridge.sql` file into `external-database/init` - the file **must** be called this and **must** be in this directory to be ignored by git.
4. In the project directory, run the following command 
   ```
    docker-compose up -d external-database database-ui
   ```
5. If it works correctly, keep an eye on the logs with the following command
   ```
    docker-compose logs -f
   ```
   If it works, it should stop on a line that says it's initializing using the `humber_bridge.sql` file - this will probably take a few hours
6. When the hours are up, you'll be able to login at http://localhost:8080 with the following details:
   - **Server**: external-database
   - **User**: root
   - **Password**: example
   - **Database**: humber_bridge
