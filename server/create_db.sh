#!/bin/bash

cd /usr/src/app/prisma/db

cp /usr/src/app/prisma/schema.prisma /usr/src/app/prisma/db

sleep 2

nc -w 1 dbpostgres 5432 2>/dev/null
while [[ $? -ne 0 ]]
do
    nc -w 1 dbpostgres 5432 2>/dev/null
done

sleep 2

chmod -R 777 /usr/src/app/node_modules

chmod -R 777 /usr/src/app/prisma/

npx prisma db push --force-reset

cp /usr/src/app/prisma/db/schema.prisma /usr/src/app/node_modules/.prisma/client

# cd /usr/src/app

# npm start