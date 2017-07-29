const FrameStorageService = require('./frame-storage.service');
const VideoConverter = require('./convert-video.service');
const FileSystemSetupService = require('./file-system-setup.service');
const Logger = require('./log.service');

class MainController {
    constructor(http) {
        require('socket.io')(http).on('connection', this.init);
    }

    init(socket) {
        Logger.info('Incoming socket connection');
        FileSystemSetupService.setup();

        socket.on('video-chunk', MainController.saveFrame);

        socket.on('disconnect', MainController.saveVideo);
    }

    static saveFrame(chunk) {
        Logger.info('Started frame saving');
        FrameStorageService.storeBase64Image(chunk)
            .then(() => {
                Logger.info('Frame successfully saved');
            })
            .catch((e) => {
                Logger.error(e);
            });
    }

    static saveVideo() {
        Logger.info('Started video saving');
        Logger.debug(FrameStorageService.FRAMES_PATH);

        VideoConverter.makeVideoFromFramesInPath(FrameStorageService.FRAMES_PATH)
            .then(() => {
                Logger.info('Video successfully saved');
                FileSystemSetupService.teardown();
            })
            .catch((e) => {
                Logger.error(e);
            });
    }
}

module.exports = function(http) {
    return new MainController(http);
}