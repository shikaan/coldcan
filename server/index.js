const app = require('express')();
const http = require('http').Server(app);
const Logger = require('./log.service');

const PORT = process.env.port || 3000;

require('./main.controller');

http.listen(PORT, () => {
    Logger.info('Listening on port: ', PORT);
});
