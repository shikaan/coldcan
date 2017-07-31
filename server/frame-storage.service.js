const path = require('path');
const fs = require('fs');
const Logger = require('./log.service');

const FRAMES_PATH = path.join(__dirname, '../frames');

class FrameStorageService {
    constructor() {
        this.FRAMES_PATH = FRAMES_PATH;
    }

    static parseRawBase64String(rawBase64String) {
        const dataArray = rawBase64String.split('data:')[1].split(';base64,');
        return {
            extension: FrameStorageService.getExtensionFromMimeType(dataArray[0]),
            cleanString: dataArray[1],
        };
    }

    static getExtensionFromMimeType(mimetype) {
        return mimetype.split('/')[1];
    }

    getFileName(extension) {
        const name = Date.now();
        return `${this.FRAMES_PATH}/${name}.${extension}`;
    }

    storeBase64Image(rawBase64String) {
        return new Promise((resolve, reject) => {
            let imageData, fileName;
            
            try{
                imageData = FrameStorageService.parseRawBase64String(rawBase64String);
                fileName = this.getFileName(imageData.extension);
            }
            catch(e){
                reject(e);
            }

            fs.writeFile(fileName, imageData.cleanString, 'base64', (error) => {
                if (error) {
                    Logger.error('An error occured while converting to image');
                    Logger.debug(error);
                    reject(new Error('An error occured while converting to image'));
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = new FrameStorageService();
