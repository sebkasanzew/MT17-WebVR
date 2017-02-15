# MT17-WebVR

WebVR is currently not supported in the stable releases of major browsers.
In order to view this project with the HTC Vive, you need to download a preview version of Chrome (October 2016), which you can find [here](https://drive.google.com/open?id=0BzudLt22BqGRc2lEWDg2NkptNzg). 

Due to a currently [known bug](https://github.com/toji/chrome-webvr-issues/issues/135) you need use the october 2016 version of Chrome and also an older version of SteamVR, which you can download [here](https://www.dropbox.com/s/xfydwr4mea0fvsx/SteamPatch.zip?dl=0):
1. unzip to any directory XXX
2. make sure Steam and SteamVR are not running
3. start XXX\SteamPatch\openvr\bin\win64\vrserver.exe
4. run Chrome VR, the app and open the VR mode

But you can open the scene without being able to interact with it, with all major browsers. 

## Build instructions

- install [node.js](https://nodejs.org/en/download/) and [yarn](https://yarnpkg.com/en/docs/install)
- open the terminal/command line and navigate to the project folder
- run `yarn`
- after that run `npm run build` or `npm run build:p` for a compressed production build

## Developer instructions
In order access the project scene from the browser you can run `npm run serve` in the terminal and access the site via [http://localhost:9090](http://localhost:9090).
