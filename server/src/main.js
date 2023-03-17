// Import dependencies
const fs = require('fs');
//tag for unit test don't touch.
//# http #//
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const api = require('./routes/routes');
//tag for unit test don't touch.
//# const special test #//
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { checkInput } = require("./middleware/check_input")
const { log } = require("./tools/logger")
const {about} = require('./controllers/about')
const {launchJobOnStart} = require('./controllers/job/job_extra')

// Create a new express application named 'app'
const app = express();

// Set our backend port to be either an environment variable or port 5000
const hostname = 'backend';
//tag for unit test don't touch.
//# httpPort #//
const httpsPort = 8080;

// To be able to stringify BigInt in json.
BigInt.prototype.toJSON = function() { return this.toString() }

// This application level middleware prints incoming requests to the servers console, useful to see incoming requests
app.use((req, res, next) => {
    console.log(`Request_Endpoint: ${req.method} ${req.url}`);
    // console.log(userExpectedInput.get(req.url).username)
    next();
});

// Configure the bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Configure the cookieParser middleware
app.use(cookieParser());

// Configure the CORs middleware
var corsOptions = {
    origin: 'http://localhost:8081',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true
}
app.use(cors(corsOptions));

// Use the given prefix for the route in onlyForSpecialTestApi. tag for unit test don't touch.
//# special test #//

// Check if the input is good and complete or refuse if needed.
app.use(checkInput);

// Use the given prefix for the route in api.
app.use('/api/v3/', api);

app.get('/about', about);
app.get('/about.json', about);

// Catch any bad requests
app.get('*', (req, res) => {
    console.log('Catch All');
    res.status(200).json({
        msg: 'Catch All'
    });
});

//tag for unit test don't touch.
//# He's dead Jim #//

//tag for unit test don't touch.
//# BIG CHUNGUS #//

// Configure the SSL certificate.
const certificate = fs.readFileSync('localhost/localhost.crt', 'utf8');
const privateKey  = fs.readFileSync('localhost/localhost.key', 'utf8');
const credentials = {cert: certificate, key: privateKey, passphrase: "test"};

//tag for unit test don't touch.
//# http server #//

// Create the https server.
var httpsServer = https.createServer(credentials, app);

//tag for unit test don't touch.
//# http listen #//

// Configure our server to listen on the port defiend by our port variable
httpsServer.listen(httpsPort, hostname, () => {
    console.log(`[HTTPS] Server running at https://${hostname}:${httpsPort}/`);
    launchJobOnStart();
});

module.exports.prisma = prisma;


//docker exec -it dashboard_bend sh
//sudo chmod -R 777 db
//systemctl stop apache2.service
//docker stop $(docker ps -aq)
//docker rm $(docker ps -aq)
//docker rmi $(docker images -q)
//git reset HEAD^
//npm install nyc --save
//npm install node-fetch@2.6.7 --save-exact