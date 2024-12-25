## 👋 Welcome

You've reached fxck presents' (better name coming soon) server - written in TypeScript and powered by [NestJS](https://docs.nestjs.com/)

## 🏃‍♂️ Getting started

Running this project requires two dependencies to be installed on your machine:

- [pnpm](https://pnpm.io/installation)
- [docker](https://www.docker.com/) (and compose)

```bash
# will take care of installing your dependencies
# and creating a .env file for you
$ make init

# will spin up your development server
$ make up

# (optional) will seed your database (🚧 coming soon)
$ make run-seeders

# will verify that the server is running
$ curl localhost:3000/api/health
```

## 🐛 Debugging

In order to connect a debugger to our server we can use `$ make debug` instead of `$ make up` when spinning our environment up. This will run Nest with debugging support enabled and accepting connections on localhost:9229.

A VSCode debug configuration is included in this project ('./vscode/launch.json'). When using any other editor you'd want to follow its own documentation and attach a node debugger to localhost:9229, while configuring its root to point to the workspace in our Docker image - '/app'

## 🔨 Useful make commands

| Command               | Action                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------- |
| make init             | Initializes the project                                                                     |
| make up               | Spins containers up in detached mode                                                        |
| make debug            | Spins containers up in detached mode with debugging enabled                                 |
| make down             | Spins containers down                                                                       |
| make build            | Does a clean build of the docker image. Useful for things like post-install of a dependency |
| make clean            | Removes node modules as well as build arfitacts                                             |
| make attach           | Attaches to the container's shell, allowing you to execute bash commands                    |
| make logs             | Connects to the container's STDOUT, providing a stream of logs                              |
| make new-migration    | Generates a new migration file                                                              |
| make run-migrations   | Runs any pending database migrations                                                        |
| make run-seeders      | Seeds the database                                                                          |
| make revert-migration | Reverts the last migration                                                                  |

## 🪹 Migrations (🚧 coming soon)

During development of the MVP migrations are not being used. Instead TypeORM manages the DB schema under the hood, enabled via the `synchronize` option in our [Database Config](src/core/database/database.config.ts). This will not be the case anymore when our environments start getting regular usage. Then migrations will become the go to. The shift from synchronize -> migrations is a three step process:

- synchronization is disabled and migration runs are enabled
- the DB is dropped
- a migration is generated to initialize the database

#### Working with Migrations

TypeORM provides useful helpers that can create/run/revert/generate migrations. Here's a quick look at the commands we have defined:

```bash
# will generate a migration by diffing the DB schema and the registered entities
$ make new-migration name=CreateUserTable

# will run all new migrations
$ make run-migrations

# will revert the last migration that was ran
# this may be ran as many times as necessary, depending on the
# number of migrations that need to be reverted
$ make revert-migration
```

#### Tip

The migrations that we create/run via the CLI use the generated build output. If you're experiencing any unexpected behaviour running `pnpm build` and re-running your command is a good sanity check.
