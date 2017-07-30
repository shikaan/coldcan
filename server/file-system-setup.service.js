const fs = require('fs');
const {
    VIDEO_PATH,
} = require('./convert-video.service');
const {
    FRAMES_PATH,
} = require('./frame-storage.service');
const rimraf = require('rimraf');

// This should handle the creation of folders relative to sesisons
class FileSystemSetupService {
    static setup() {
        if (!fs.existsSync(FRAMES_PATH)) fs.mkdirSync(FRAMES_PATH);
        if (!fs.existsSync(VIDEO_PATH)) fs.mkdirSync(VIDEO_PATH);
    }

    static teardown() {
        rimraf.sync(FRAMES_PATH);
    }
}

module.exports = FileSystemSetupService;
