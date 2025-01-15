# syntax=docker/dockerfile:1
### It is important to put this syntax specification at the start!!
### https://docs.docker.com/build/dockerfile/frontend/
### https://stackoverflow.com/questions/75309371/dockerfile-with-heredoc-running-in-bash

### ARG and ENV declaration and initialisation
ARG BASE_IMAGE=alpine
ARG ALPINE_LATEST=latest
ARG ALPINE_PENULTIMATE=3.20.5

### Base image
FROM ${BASE_IMAGE}:${ALPINE_PENULTIMATE}


### Installation phase

###### Utilties install
RUN <<EOF
apk update
apk add bash wget zsh git
EOF

###### setup ohmyzsh open-source, community-driven framework for managing your Zsh configuration
RUN <<EOF
bash -c "$(wget https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"
echo 'PROMPT=%B%F{blue}[DOCKER]%f%b$PROMPT' >> /root/.zshrc
EOF

###### install node.js and npm
RUN <<EOF
apk update
apk add nodejs npm
EOF

###### install image related tools
RUN <<EOF
apk update
apk add imagemagick
EOF

### Environment configuration

USER root


### Metadata about the image specified here in the Dockerfile
LABEL \
	author="jya0 <jyao@student.42abudhabi.ae>" \
	maintainer="jya0 <jyao@student.42abudhabi.ae>" \
	version="1.1" \
	description="This Dockerfile builds a dev environment to write and test website portfolio."