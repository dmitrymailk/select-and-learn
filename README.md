# Build ionic for android

- [capacitor official docs](https://capacitorjs.com/docs/getting-started/with-ionic)

1. ionic integrations enable capacitor
2. npx cap init "App Name" "unique_id" - npx cap init "Select and Learn!" "select.and.learn.web.app"
3. ionic build
4. npm install @capacitor/android
5. выставить в capacitor.config.json поле webDir в значение папки с билдом
6. npx cap add android
7. npx cap open android

- ionic build && npm install @capacitor/android && npx cap open android

# Add app to share button

- [all abount ionic intent](https://stackoverflow.com/questions/43712312/make-ion..)
- [web intent](https://ionicframework.com/docs/native/web-intent/)

# Ionic live reload

- [official documentation](https://ionicframework.com/docs/cli/livereload)

# Sing release application

- [self sign apk](http://www.androiddevelopment.org/2009/01/19/signing-an-android-application-for-real-life-mobile-device-usage-installation/)

# Correct app settings

- [filter intent](https://stackoverflow.com/questions/9250956/app-icon-not-showing-in-programs-list-on-device)

- [icon generator](<https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html#foreground.space.trim=1&foreground.space.pad=0.25&foreColor=rgba(96%2C%20125%2C%20139%2C%200)&backColor=rgb(68%2C%20138%2C%20255)&crop=0&backgroundShape=circle&effects=none&name=ic_launcher>)
