FROM node:lts as base

RUN apt-get -qy update && apt-get -qy install openssl netcat

RUN mkdir -p /usr/src/app

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN npm install prisma@4 @prisma/client@4

RUN npm install

RUN cp /usr/src/app/prisma/schema.prisma /usr/src/app/prisma/db

WORKDIR /usr/src/app/prisma/db

RUN npx prisma generate

WORKDIR /usr/src/app

#HTTPS
EXPOSE 8080

FROM base as test

#HTTP
EXPOSE 8079

RUN perl -pi -e "s{//# http #//}{const http = require('http');}" /usr/src/app/src/main.js

RUN perl -pi -e "s{//# const special test #//}{const onlyForSpecialTestApi = require('./routes/specialTestRoute');}" /usr/src/app/src/main.js

RUN perl -pi -e "s{//# httpPort #//}{const port = 8079;}" /usr/src/app/src/main.js

RUN perl -pi -e "s{//# special test #//}{app.use('/api/v3/spec1al/t3st42/', onlyForSpecialTestApi);}" /usr/src/app/src/main.js

RUN perl -pi -e "s{//# http server #//}{var httpServer = http.createServer(app);}" /usr/src/app/src/main.js

RUN perl -pi -e "s{//# He's dead Jim #//}{app.post('/He\\\'s_dead_Jim', (req, res) => {\n\
    if (req.body.password == 68179798) {\n\
        console.log('He\\\'s dead Jim');\n\
        res.status(200);\n\
        process.exit(0);\n\
    }\n\
    res.status(401).json({});\n\
});}" /usr/src/app/src/main.js

RUN perl -pi -e "s{//# BIG CHUNGUS #//}{app.post('/BIG_CHUNGUS', (req, res) => {\n\
    const data = {\n\
        value1: BigInt('1231231231231231213'),\n\
    }\n\
    JSON.stringify(data)\n\
    res.status(401).json({});\n\
});}" /usr/src/app/src/main.js

RUN perl -pi -e "s{//# http listen #//}{httpServer.listen(port, hostname, () => {\n\
    console.log(`[HTTP] Server running at http://${hostname}:${port}/`);\n\
});}" /usr/src/app/src/main.js

CMD [ "npm", "run", "coverage" ]

FROM base as serverProd

#HTTP
EXPOSE 8079

RUN perl -pi -e "s{//# http #//}{const http = require('http');}" /usr/src/app/src/main.js

RUN perl -pi -e "s{//# httpPort #//}{const port = 8079;}" /usr/src/app/src/main.js

RUN perl -pi -e "s{//# http server #//}{var httpServer = http.createServer(app);}" /usr/src/app/src/main.js

RUN perl -pi -e "s{//# http listen #//}{httpServer.listen(port, hostname, () => {\n\
    console.log(`[HTTP] Server running at http://${hostname}:${port}/`);\n\
});}" /usr/src/app/src/main.js

CMD [ "npm", "start" ]

FROM base as prod

CMD [ "npm", "start" ]

FROM base as restart

RUN chmod +x ./create_db.sh

CMD [ "./create_db.sh" ]