# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: jyao <jyao@student.42abudhabi.ae>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2025/01/10 10:29:56 by jyao              #+#    #+#              #
#    Updated: 2025/01/19 14:11:53 by jyao             ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

DOCKERFILE_PATH = ./
DOCKERFILE_NAME = Dockerfile
DOCKERFILE_FILE = $(DOCKERFILE_PATH)$(DOCKERFILE_NAME)
DOCKERFILE_BUILD_CONTEXT = ./
IMAGE_NAME = portolio-dev-env:latest
CONTAINER_NAME = portolio-dev-env-c
CONTAINER_WORKDIR = /workdir
CONTAINER_PORTS = -p 443:443 -p 80:80 -p 3000:3000 -p 5173:5173 -p 5172:5172 -p 4173:4173

.PHONY: all usage build start clean fclean

all: usage

usage:
	@echo "USAGE:"
	@echo "    <make build>              builds the portolio development environment docker image"
	@echo "    <make start [PATH]>       starts the portolio development environment container at the current working directory"
	@echo "                              if [PATH] a full/absolute path is specified, the container will load all files at this location into the container instead"
	@echo "    <make clean>              clears the portolio development environment docker container"
	@echo "    <make fclean>             clears the portolio development environment docker container and image"


build:
	docker build \
	-f $(DOCKERFILE_FILE) \
	-t $(IMAGE_NAME) \
	$(DOCKERFILE_BUILD_CONTEXT)

start:

ifeq ($(words $(MAKECMDGOALS)), 2)
	mkdir -p $(word 2, $(MAKECMDGOALS))
	docker run -it \
	$(CONTAINER_PORTS) \
	--name $(CONTAINER_NAME) \
	--rm \
	-w /workdir \
	-v "$(word 2, $(MAKECMDGOALS)):$(CONTAINER_WORKDIR)" \
	$(IMAGE_NAME) \
	"/bin/zsh"
else
ifeq ($(words $(MAKECMDGOALS)), 1)
	docker run -it \
	$(CONTAINER_PORTS) \
	--name $(CONTAINER_NAME) \
	--rm \
	-w /workdir \
	-v "$(PWD):$(CONTAINER_WORKDIR)" \
	$(IMAGE_NAME) \
	"/bin/zsh"
else
	make usage
endif
endif

clean:
	docker rm -f $(CONTAINER_NAME)

fclean: clean
	docker rmi -f $(IMAGE_NAME)