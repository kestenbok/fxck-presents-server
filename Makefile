CONTAINER_NAME=api

up:
	CMD="start:dev" docker compose up -d

debug:
	CMD="start:debug" docker compose up -d

down: 
	CMD="" docker compose down

build:
	docker compose build --no-cache

clean:
	rm -rf node_modules dist

attach:
	docker container exec -ti $(CONTAINER_NAME) bash

new-migration:
	docker container exec -ti $(CONTAINER_NAME) bash -c 'pnpm migration:generate $(name)'

run-migrations:
	docker container exec -ti $(CONTAINER_NAME) bash -c 'pnpm migration:run'

run-seeders:
	docker container exec -ti db bash -c './seeders/run_seeders.sh'

revert-migration:
	docker container exec -ti db bash -c 'pnpm migration:revert'

logs:
	docker logs $(CONTAINER_NAME) -f