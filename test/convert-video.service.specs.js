const mocha = require('mocha');
const assert = require('assert');
const sinon = require('sinon');
const mock = require('mock-require');

mock('fluent-ffmpeg', sinon.spy());
const service = require('../server/convert-video.service');

const ffmpeg = require('fluent-ffmpeg');

describe('VideoConverter', () => {
	it('should call ffmpeg', (done) => {
		service.makeVideoFromFramesInPath('asdf')
			.catch(() => {
				assert(ffmpeg.calledOnce);
				done();
			})
	})
})
