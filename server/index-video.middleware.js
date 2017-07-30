const express = require('express');
const serveIndex = require('serve-index');
const VideoConverter = require('./convert-video.service');
const Logger = require('./log.service');

class IndexVideoMiddleware {
	constructor(app) {
		this.init(app);
	}

	init(app) {
		Logger.info('Serving videos from:', VideoConverter.VIDEO_PATH);
		app.use('/', serveIndex(VideoConverter.VIDEO_PATH, {
			icons: true,
		}));
		app.use('/', express.static(VideoConverter.VIDEO_PATH));
	}
}

module.exports = function middleware(app) {
	return new IndexVideoMiddleware(app);
};