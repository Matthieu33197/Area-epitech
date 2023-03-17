#!/bin/bash

if [ "$1" = "recreate" ] || [ "$1" = "re" ]
then
    sudo rm -rf ./server/prisma/db
    mkdir ./server/prisma/db
    sudo docker-compose -f docker-compose.yml -f ./server/docker-compose.restart.yml up --build backend
    sudo docker-compose -f docker-compose.yml -f ./server/docker-compose.prod.yml up --build
elif [ "$1" = "s_recreate" ] || [ "$1" = "sre" ]
then
    sudo rm -rf ./server/prisma/db
    mkdir ./server/prisma/db
    sudo docker-compose -f docker-compose.yml -f ./server/docker-compose.restart.yml up --build backend
    sudo docker-compose -f docker-compose.yml -f ./server/docker-compose.serverProd.yml up --build
elif [ "$1" = "full_recreate" ] || [ "$1" = "fre" ]
then
    sudo rm -rf ./server/prisma/db
    sudo docker container stop $(sudo docker container ls -aq)
    sudo docker system prune -af --volumes
    mkdir ./server/prisma/db
    sudo docker-compose -f docker-compose.yml -f ./server/docker-compose.restart.yml up --build backend
    sudo docker-compose -f docker-compose.yml -f ./server/docker-compose.prod.yml up --build
elif [ "$1" = "s_full_recreate" ] || [ "$1" = "sfre" ]
then
    sudo rm -rf ./server/prisma/db
    sudo docker container stop $(sudo docker container ls -aq)
    sudo docker system prune -af --volumes
    mkdir ./server/prisma/db
    sudo docker-compose -f docker-compose.yml -f ./server/docker-compose.restart.yml up --build backend
    sudo docker-compose -f docker-compose.yml -f ./server/docker-compose.serverProd.yml up --build
elif [ "$1" = "rebuild" ] || [ "$1" = "rebu" ]
then
    sudo docker-compose -f docker-compose.yml -f ./server/docker-compose.prod.yml up --build backend
elif [ "$1" = "back-test" ] || [ "$1" = "b-test" ]
then
    cd ./server/unit-test
    ./test.sh
elif [ "$1" = "clean" ] || [ "$1" = "cl" ]
then
    sudo rm -rf ./server/prisma/db
    docker-compose rm
elif [ "$1" = "full_clean" ] || [ "$1" = "fcl" ]
then
    sudo rm -rf ./server/prisma/db
    sudo docker container stop $(sudo docker container ls -aq)
    sudo docker system prune -af --volumes
elif [ "$1" = "server" ] || [ "$1" = "s" ]
then
    sudo docker-compose -f docker-compose.yml -f ./server/docker-compose.serverProd.yml up
else
    sudo docker-compose -f docker-compose.yml -f ./server/docker-compose.prod.yml up
fi