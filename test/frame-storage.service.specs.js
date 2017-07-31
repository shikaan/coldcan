const mocha = require('mocha');
const assert = require('assert');
const sinon = require('sinon');

const service = require('../server/frame-storage.service');
const fs = require('fs');

describe("FrameStorageService", () => {

	describe("storeBase64Image", () => {
		const cleanBase64String = "asfd72dfASfdsadfsdf";
		const goodRawBase64String = "data:image/png;base64," + cleanBase64String;

		const getFileName = sinon.stub(service, 'getFileName');
		const writeFile = sinon.stub(fs, 'writeFile').callsFake(() => { console.log('written!')});

		it("should store image", () => {
			service.storeBase64Image(goodRawBase64String);

			assert(getFileName.calledWith("png"))
			assert(writeFile.calledWith(service.getFileName("png"), "asfd72dfASfdsadfsdf", "base64"))
		})

		it("should reject promise in case of incomplete string", (done) => {
			let catched = false
			service.storeBase64Image(cleanBase64String)
				.then(() => {
					catched = false;
				})
				.catch(() => {
					catched = true;
				})
				.then(() => {
					assert(catched, true);
					done();
				})
		})

		it("should reject promise in case of no string", (done) => {
			let catched = false
			service.storeBase64Image(null)
				.then(() => {
					catched = false;
				})
				.catch(() => {
					catched = true;
				})
				.then(() => {
					assert(catched, true);
					done();
				})
		})
	})
})