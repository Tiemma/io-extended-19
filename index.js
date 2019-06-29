/***
More stackdriver feature docs here:
@url: https://github.com/Tiemma/stackdriver-node-demo
 */
require('@google-cloud/trace-agent').start({ enhancedDatabaseReporting: true});

const debug = require('debug')('io-extended-19:server');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const router = express.Router();
const got = require('got');

const index = express();

index.use(logger('dev'));
index.use(express.json());
index.use(express.urlencoded({ extended: false }));
index.use(cookieParser());

const app = function(req, res) {
    res.status(200).json({
        data: {
            message: "Hello World!",
            randomNum: Math.random() * 100
        },
        status: "OK",
        message: "Hello world!"
    })
};

const slowApp = async function(req, res) {
    const DISCOVERY_URL = 'https://www.googleapis.com/discovery/v1/apis';

    // This outgoing HTTP request should be captured by Trace
    const apiData = (await got(DISCOVERY_URL, { json: true })).body.items.map((item) => item.name);

    setTimeout(() => debug(''))

    res.status(200).json({
        data: {
            message: "Hello World!",
            randomNum: Math.random() * 100,
            apiData
        },
        status: "OK",
        message: "Hello world!"
    })
};

const trace = function (req, res) {
    const DISCOVERY_URL = 'https://www.googleapis.com/discovery/v1/apis';

    // This outgoing HTTP request should be captured by Trace
    got(DISCOVERY_URL, { json: true })
        .then((response) => {
            const names = response.body.items.map((item) => item.name);
            res
                .status(200)
                .send(names.join('\n'))
                .end();
        })
        .catch((err) => {
            logger.error(err);
            res
                .status(500)
                .end();
        });
};

router.get('/', app);
router.get('/slow', slowApp);
router.get('/trace', trace);


index.use('/', router);

module.exports = { app, slowApp, trace, index, debug };
