Install:
Node.js -> https://nodejs.org/en/ 
SDK Tools Only -> http://developer.android.com/sdk/index.html#Other

EnviromentVariables
set ANDROID_HOME=C:\<installation location>\android-sdk-windows   (Example-> C:\Program Files (x86)\Android\android-sdk)
set PATH=%PATH%;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools

(Reboot)

COMMAND LINE

Run Terminal as Admin

Install Cordova:
cmd-> npm install -g cordova

Update SDK Android API 22:
cmd-> android update sdk --no-ui

Build:
Move to Project Folder (Example->D:\Polimatica\NXXXNNNX_00_ATA\mobile\ATA)
cmd-> cordova build android

Examples:
https://cordova.apache.org/#getstarted
