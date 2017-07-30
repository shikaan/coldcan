const app = require('express')();
const http = require('http').Server(app);
const Logger = require('./log.service');

const PORT = process.env.port || 3000;

require('./index-video.middleware')(app);
require('./configuration.controller')(app);
require('./main.controller')(http);

http.listen(PORT, () => {
    Logger.info('Listening on port: ', PORT);
});
