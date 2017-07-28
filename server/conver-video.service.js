const videoshow = require('videoshow');
const Logger = require('./log.service');

const CONFIGURATION = {
	fps: 5,
	transition: false,
	videoBitrate: 1024 ,
	videoCodec: 'libx264', 
	size: '640x640',
	outputOptions: ['-pix_fmt yuv420p'],
	format: 'mp4' 
}
const VIDEO_PATH = './temp/video'

class VideoConverter{

	_getVideoPath(fileName){
		return `${VIDEO_PATH}/${fileName}.${CONFIGURATION.format}`
	}

	makeVideoFromFrames(frames){
		return new Promise((resolve, reject) => {
			videoshow(frames, CONFIGURATION)
				.save(_getVideoPath(Date.now()))
				.on('start', function (command) { 
					Logger.info("Started conversion");
				})
				.on('error', (err, stdout, stderr) => {
				  	Logger.error(err);
				  	Logger.debug("Stderr: ", stderr);
				  	Logger.debug("Stdout: ", stdout);
				  	reject(err);
				})
				.on('end', function (outputPath) {
				  Logger.info("Conversion complete!")
				  Logger.debug(outputPath);
				  resolve();
				})
		})
	}
}

module.exports = new VideoConverter();