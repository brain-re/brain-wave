.PHONY: help
DOCKER := docker compose
ANGULAR := ${DOCKER} exec -it angular
EXPRESS := ${DOCKER} exec -it express
MONGO := ${DOCKER} exec -it mongo
ifeq (run,$(firstword ${MAKECMDGOALS}))
  # use the rest as arguments for "run"
  RUN_ARGS := $(wordlist 2,$(words ${MAKECMDGOALS}),${MAKECMDGOALS})
  # ...and turn them into do-nothing targets
  $(eval ${RUN_ARGS}:;@:)
endif

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' ${MAKEFILE_LIST}

.DEFAULT_GOAL := help

echo:
	echo "globals :" ${MAKECMDGOALS}

########################
## 🐋 CONTAINERS 🐋 ##
########################

list: ## List running containers
	${DOCKER} ps

up: ## Up containers
	${DOCKER} up

build: ## Up and build containers
	{DOCKER} up --build {RUN_ARGS}

sh-node: ## Open node container
	${EXPRESS} sh

sh-mongo: ## Open mongo container
	${MONGO} sh

sh-angular: ## Open angular container
	${ANGULAR} sh

stop: ## Stop containers
	${DOCKER} down

.PHONY: list up build node mongo stop echo

########################
##  💾 DATABASES 💾  ##
########################

migration: ## Add a new migration file
	${EXPRESS} migrate create ${RUN_ARGS}

migrate-up: ## Execute migrations up to last available one
	${EXPRESS} migrate

migrate-down: ## Execute migrations down
	${EXPRESS} migrate down ${RUN_ARGS}

migrate-list: ## List migrations
	${EXPRESS} migrate list

fixtures: ## Execute fixtures
	${EXPRESS} node fixtures/fixtures.js

fixtures-prune: ## Execute fixtures with pruning the database before
	${EXPRESS} node fixtures/fixtures.js --prune

.PHONY: migration migrate migrate-down migrate-list fixtures fixtures-prune