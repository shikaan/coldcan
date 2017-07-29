// gifshot
// http://cliffordhall.com/2016/10/creating-video-server-node-js/
// https://github.com/h2non/videoshow


const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const FrameStorageService = require('./frame-storage.service');
const VideoConverter = require('./convert-video.service');
const Logger = require('./log.service');

app.get('/', (req, res) => {
    res.sendStatus(200);
});

io.on('connection', (socket) => {
    Logger.info('Incoming socket connection');
    
    socket.on('video-chunk', (chunk) => {
    	Logger.info("Chunk received");
        FrameStorageService.storeBase64Image(chunk)
        	.then(() => {
        		Logger.info("Chunk successfully saved");
        	})
        	.catch((e) => {
        		Logger.error(e);
        	})
    });

    socket.on('disconnect', () => {
    	Logger.info("Started video saving");
    	Logger.debug(FrameStorageService.FRAMES_PATH);
    	
        VideoConverter.makeVideoFromFramesInPath(FrameStorageService.FRAMES_PATH)
        	.then(() => {
        		Logger.info("Video successfully saved");
        	})
        	.catch((e) => {
        		Logger.error(e);
        	})
    });
});


http.listen(3000, () => {
    console.log('listening on *:3000');
});
