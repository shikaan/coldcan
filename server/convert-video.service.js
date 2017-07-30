const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const Logger = require('./log.service');

const configuration = require('../configuration.json');

const VIDEO_PATH = path.join(__dirname, '../video');

class VideoConverter {
    constructor() {
        this.FFMPEG_CONFIGURATION = {
            format: 'mp4',
            bitrate: 1024,
            codec: 'libx264',
            inputOptions: ['-pattern_type glob'],
            outputOptions: ['-pix_fmt yuv420p'],
            fps: Number.parseInt(configuration.fps, 10),
        };
        this.VIDEO_PATH = VIDEO_PATH;
    }

    getVideoPath(fileName) {
        return `${this.VIDEO_PATH}/${fileName}.${this.FFMPEG_CONFIGURATION.format}`;
    }

    static getFramesPattern(framesPath) {
        return path.join(framesPath, `*.${configuration.frameExtension}`);
    }

    makeVideoFromFramesInPath(framesPath) {
        return new Promise((resolve, reject) => {
            ffmpeg({
                source: VideoConverter.getFramesPattern(framesPath),
                logger: console,
            })
                .inputFps(this.FFMPEG_CONFIGURATION.fps)
                .inputOptions(this.FFMPEG_CONFIGURATION.inputOptions)
                .noAudio()
                .videoCodec(this.FFMPEG_CONFIGURATION.codec)
                .videoBitrate(this.FFMPEG_CONFIGURATION.bitrate)
                .outputOptions(this.FFMPEG_CONFIGURATION.outputOptions)
                .fps(this.FFMPEG_CONFIGURATION.fps)
                .size('640x?')
                .on('start', () => {
                    Logger.info('Started conversion');
                })
                .on('progress', (progress) => {
                    Logger.info(`Frames: ${progress.frames}`);
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
                    resolve();
                })
                .save(this.getVideoPath(Date.now()));
        });
    }
}

module.exports = new VideoConverter();
