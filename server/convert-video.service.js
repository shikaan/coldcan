const videoshow = require('videoshow');
const path = require('path');
const fs = require('fs');
const Logger = require('./log.service');

const CONFIGURATION = {
    fps: 5,
    transition: false,
    videoBitrate: 1024,
    videoCodec: 'libx264',
    size: '640x480',
    outputOptions: ['-pix_fmt yuv420p'],
    format: 'mp4',
};
const VIDEO_PATH = path.join(__dirname, '../video');

class VideoConverter {
    constructor() {
        this.CONFIGURATION = CONFIGURATION;
        this.VIDEO_PATH = VIDEO_PATH;
    }

    getVideoPath(fileName) {
        return `${this.VIDEO_PATH}/${fileName}.${this.CONFIGURATION.format}`;
    }

    static getFramesInPath(framesPath) {
    // Videoshow allows only png, jpg and bmp as frames
        return fs.readdirSync(framesPath)
            .filter(fileName => /(.png)$|(.jpg)$|(.bmp)$/.test(fileName))
            .map(fileName => path.join(framesPath, fileName));
    }

    makeVideoFromFramesInPath(framesPath) {
        return new Promise((resolve, reject) => {
        	let frames;
	    	try {
	            frames = VideoConverter.getFramesInPath(framesPath);
	    	} catch (e) {
	    		Logger.error('Unable to get frames in path', framesPath);
	    		reject(e);
	    	}

            if (frames && frames.length > 0) {
                videoshow(frames, this.CONFIGURATION)
                    .save(this.getVideoPath(Date.now()))
                    .on('start', () => {
                        Logger.info('Started conversion');
                    })
                    .on('error', (err, stdout, stderr) => {
                        // Please note: this error is thrown if frames don't have
                        // the same height and width. 
                        // TODO: add image size check somewhere 
                        Logger.error(err);
                        Logger.debug('Stderr: ', stderr);
                        Logger.debug('Stdout: ', stdout);
                        reject(err);
                    })
                    .on('end', (outputPath) => {
                        Logger.info('Conversion complete!');
                        Logger.debug(outputPath);
                        resolve();
                    });
            } else {
                reject(new Error('No frames provided!'));
            }
        });
    }
}

module.exports = new VideoConverter();
