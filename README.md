# coldcan #

A deadly simple, not production ready, clone of Hotjar.

## Introduction ##

This project was born as a game: I tried to emulate a well known SaaS
with very simple technologies and in a small amount of time. 

This is not meant to be used in production for:

 - it can only save correctly one session per time;

 - it expose publicly all the videos;

 - it lacks any form of authentication;

 - it may not work on complicated sites;

 - on every configuration change you have to rebuild and clients won't be aware of changes;

 - order of frames is not 100% guaranteed;

Again, please don't take this too seriously.

## What it's supposed to do ##

This should record a configurable-amount-of-time long video of the page. 

## Building ##

Set configuration options in `configuration.json` file and run `npm build`.

## Configuring ##

| Entry           | Description                                                                                                                 | Example                  |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------|--------------------------|
| server          | The URL of the video converting server                                                                                      | `http://localhost:3000`  |
| elementToRecord | A querySelector-friendly string.                                                                                            | `body > form#onboarding` |
| frameExtension  | The extension of the frames saved on the backend                                                                            | `png`                    |
| length          | The length of the recorded video. This can be not 100% accurate, depending on client connection.                            | `10`                     |
| fps             | The frame rate of the recorded video. Usually you don't want it to be much more than 1, unless you want your client to cry. | `1`                      |

## Usage ## 

### Client Side ###

Include the `client/coldcan-client.js` script in the page you want to record.
This will start recording as soon as the socket.io connection is established.
The video processing will start when the socket.io connection is interrupted 
(you close the browser, refresh the page and so on).

### Server Side ###

Since you need to install `ffmpeg` in order to make this work, I strongly suggest 
to use Docker.

Navigate to where you cloned the repo and then

    docker build -t coldcan .
    docker run -p 80:3000 coldcan

Et voila! The application is now running on port 80.

I'll probably create a docker registry version of this, so you won't need to do 
these last operations on your machine.

## Contributing ##

Fork this repo, edit code and make pull requests.

I included an `npm run lint` script, so I'd like to receive linted pull requests. 


## Improvement Ideas ##

There's a list of feature I will add one day or another.

- Make the client download the configuration from the server, so you don't have to rebuild it on every change;

- Base rendered video lengths on the configuration video length instead of the number of frames received, in order to have consistent video lengths in case of frames not received;