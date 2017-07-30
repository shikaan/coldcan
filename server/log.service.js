const winston = require('winston');

const LEVELS = ['debug', 'info', 'warn', 'error'];

class Logger {
    static setLevel(level) {
        winston.level = LEVELS.indexOf(level) > -1 ? level : 'debug';
    }

    static debug(...args) {
        winston.debug(`[%s]: ${args.join(' ')}`, (new Date()).toLocaleString(), { timestamp: Date.now() });
    }

    static info(...args) {
        winston.info(`[%s]: ${args.join(' ')}`, (new Date()).toLocaleString(), { timestamp: Date.now() });
    }

    static error(...args) {
        winston.error(`[%s]: ${args.join(' ')}`, (new Date()).toLocaleString(), { timestamp: Date.now() });
    }

    static warn(...args) {
        winston.warn(`[%s]: ${args.join(' ')}`, (new Date()).toLocaleString(), { timestamp: Date.now() });
    }
}

Logger.setLevel('debug');

module.exports = Logger;
