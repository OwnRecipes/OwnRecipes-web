#!/usr/bin/env sh

DOCKERIGNORE_BAK=".dockerignore.bak"
BUILD_OUT='build.tar'
DOCKER_IMAGE='ownrecipes-web-build'

# Move .dockerignore to include env files
[ -e .dockerignore ] && mv .dockerignore ${DOCKERIGNORE_BAK}
# Clean up previous build
[ -e ${BUILD_OUT} ] && rm -- ${BUILD_OUT}

docker build . -f Dockerfile-build -t ${DOCKER_IMAGE} &&
docker create --name="tmp_$$" ${DOCKER_IMAGE} &&
docker cp tmp_$$:/code/build - > ${BUILD_OUT} &&

# Clean up docker
docker rm tmp_$$ &&
docker image rm ${DOCKER_IMAGE}

# Move .dockerignore back
mv ${DOCKERIGNORE_BAK} .dockerignore
