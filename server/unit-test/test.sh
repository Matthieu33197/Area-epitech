#!/bin/bash

npm install

cd ../../

sudo docker-compose -f docker-compose.yml -f ./server/unit-test/docker-compose.test.yml up --detach --build backend

code=$(curl -I "http://localhost:8079/Gwak" 2>/dev/null | head -n 1 | cut -d$' ' -f2)
while [[ $code != "200" ]]
do
    code=$(curl -I "http://localhost:8079/Gwak" 2>/dev/null | head -n 1 | cut -d$' ' -f2)
done

mocha ./server/unit-test/test.js

# Need to stop it to test a last part.
curl --location --request POST "http://localhost:8079/He's_dead_Jim" \
--header 'Content-Type: application/json' \
--data-raw '{
    "password": 68179798
}'

sleep 1

# Need to restart it to recover the coverage.
sudo docker-compose -f docker-compose.yml -f ./server/unit-test/docker-compose.test.yml up --detach

code=$(curl -I "http://localhost:8079/Gwak" 2>/dev/null | head -n 1 | cut -d$' ' -f2)
while [[ $code != "200" ]]
do
    code=$(curl -I "http://localhost:8079/Gwak" 2>/dev/null | head -n 1 | cut -d$' ' -f2)
done

cd server/unit-test/

rm -rf ./coverage
docker cp area_bend:/usr/src/app/coverage/ ./
sudo docker-compose stop

cd ../../
sudo docker-compose -f docker-compose.yml -f ./server/docker-compose.prod.yml up --build backend