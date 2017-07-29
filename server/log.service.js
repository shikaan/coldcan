const winston = require('winston');

const LEVELS = ['debug', 'info', 'warn', 'error'];

class Logger {
    constructor(level) {
        winston.level = LEVELS.indexOf(level) > -1 ? level : 'debug';
    }

    debug() {
        winston.debug(`[%s]: ${[...arguments].join(' ')}`, (new Date()).toLocaleString(), { timestamp: Date.now() });
    }

    info() {
        winston.info(`[%s]: ${[...arguments].join(' ')}`, (new Date()).toLocaleString(), { timestamp: Date.now() });
    }

    error() {
        winston.error(`[%s]: ${[...arguments].join(' ')}`, (new Date()).toLocaleString(), { timestamp: Date.now() });
    }

    warn() {
        winston.warn(`[%s]: ${[...arguments].join(' ')}`, (new Date()).toLocaleString(), { timestamp: Date.now() });
    }
}

module.exports = new Logger('debug');
