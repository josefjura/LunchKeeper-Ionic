del .\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk
del .\platforms\android\app\build\outputs\apk\release\app-release-unsigned-aligned.apk
ionic cordova build android --release --prod
cd .\platforms\android\app\build\outputs\apk\release\
zipalign.exe -p 4 app-release-unsigned.apk app-release-unsigned-aligned.apk
apksigner.bat sign --ks c:\Users\josef\.keystore\android.jks --ks-key-alias JAR_sign app-release-unsigned-aligned.apk