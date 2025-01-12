# syntax=docker/dockerfile:1
### It is important to put this syntax specification at the start!!
### https://docs.docker.com/build/dockerfile/frontend/
### https://stackoverflow.com/questions/75309371/dockerfile-with-heredoc-running-in-bash

### ARG and ENV declaration and initialisation
ARG UBUNTU_VER_LATEST=latest
ARG UBUNTU_VER_PENULTIMATE=jammy

### Base image
FROM ubuntu:${UBUNTU_VER_PENULTIMATE}


### Installation phase

###### Utilties install
RUN <<EOF
apt update
apt install -y bash wget zsh
EOF

###### setup ohmyzsh open-source, community-driven framework for managing your Zsh configuration
RUN <<EOF
bash -c "$(wget https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"
echo 'PROMPT=%B%F{blue}[DOCKER]%f%b$PROMPT' >> /root/.zshrc
EOF


### Environment configuration


### Metadata about the image specified here in the Dockerfile
LABEL \
	author="jya0 <jyao@student.42abudhabi.ae>" \
	maintainer="jya0 <jyao@student.42abudhabi.ae>" \
	version="1.1" \
	description="This Dockerfile builds a dev environment to write and test website portfolio."