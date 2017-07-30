const html2canvas = require('html2canvas');
const io = require('socket.io-client');
const configuration = require('../configuration.json');

class Main {
	constructor() {
		this.elementToRecord = document.body;
		this.server = "http://localhost:3000";
		this.length = 10000;
		this.fps = 1;

		this._fetchElementToRecord();
		this._fetchServerUrl();
		this._fetchLength();
		this._fetchFrameRate();

		this.init();
	}

	_fetchElementToRecord() {
		try {
			this.elementToRecord = document.querySelector(configuration.elementToRecord);
		} catch (e) {
			console.error(`Unable to find ${configuration.elementToRecord} in DOM.`,
				"Please be sure you spelled it correctly and it's a valid query.",
				"Using document.body.");
		}

		if (!this.elementToRecord) {
			console.info("A null elementToRecord provided. Using document.body.")
		}
	}

	_fetchServerUrl() {
		if (configuration.server && configuration.server !== "") {
			if(/^(http)/.test(configuration.server))
				this.server = configuration.server;
			else{
				console.error("Wrong server provided: did you forget to add the http?",
					"Using: http://localhost:3000");
			}
		} else {
			console.error("Missing or wrong server provided. Using http://localhost:3000");
		}
	}

	_fetchLength() {
		const length = Number.parseFloat(configuration.length);

		if(length === length){
			this.length = length * 1000;
		}
		else{
			console.error("Wrong length provided. Using 10s.")
		}
	}

	_fetchFrameRate() {
		const fps = Number.parseInt(configuration.fps);

		if(fps === fps){
			this.fps = 1000/fps;
		}
		else{
			console.error("Wrong fps provided. Using 1fps.")
		}
	}

	init() {
		const socket = io(this.server);

		const id = setInterval(() => {
			html2canvas(this.elementToRecord)
				.then((data) => {
					let parsed = data.toDataURL(`image/${configuration.frameExtension}`, 0.5);

					//Data to be sent to the backend
					socket.emit('video-chunk', parsed);
				})
				.catch((error) => console.log(error));
		}, this.fps);

		setTimeout(() => {
			clearInterval(id);
		}, this.length)
	}
}

new Main();