
DOCKER_COMPOSE_FILE_TEST = docker-compose.dev.yml

# Define the services you want to manage
SERVICE_NAME = my_service

# Target: Build dev environnement
build:
	docker compose -f docker-compose.dev.yml build

dev:
	docker compose -f docker-compose.dev.yml up -d

devdown:
	docker compose -f docker-compose.dev.yml down

stop: 
	docker stop ${docker ps -q}
