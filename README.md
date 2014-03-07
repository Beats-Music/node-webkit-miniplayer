# Beats Music Desktop Node-Webkit

Experimental desktop app to show the functionality of the Beats Music developer API. There are several known issues** but please feel free to create pull requests to fix them!

### How do I run this?
Head to [developer.beatsmusic.com](http://developer.beatsmusic.com) and apply for a partner key.

    $ git clone git@github.com:Beats-Music/node-webkit-miniplayer.git
    
    $ cd beats-music-desktop

    $ npm install 
    
    $ cat config.example >> config.js
    
    $ npm install nodewebkit -g

Add your keys to config.js that you received from the Beats Music developer portal then you can start the app.

    $ nodewebkit
    
The app should now run in its own window. To change how the window appears you can modify the package.json.

### How do I build this as a Mac OSX app?
You can use a grunt task documented [here](https://github.com/mllrsohn/grunt-node-webkit-builder). This is already included in the Gruntfile.js.

    $ grunt releasebuild
        
This will create a folder called build. Inside of that folder will be the .app file for mac. Show the contents of the .app and go into the app.nw directory. Copy all assets from the root of the beats-music-desktop (except the build directory) directory into here and run the app.
 
Until a compile script is written for the JavaScript this is the best way to go.

### Dependencies
* [nodejs](http://nodejs.org/)
* [node-webkit](https://github.com/rogerwang/node-webkit)
* [grunt](http://gruntjs.com/)
* [superagent](http://visionmedia.github.io/superagent/)
* [jquery](http://jquery.com/)
* [handlebars](http://handlebarsjs.com/)
* [soundmanager](http://www.schillmania.com/projects/soundmanager2/)
* [bower](http://bower.io/)

### ** Known Issues

* Flash doesn't load. Potential fixes include [downloading](http://get.adobe.com/flashplayer/) Flash Player for your machine directly or you can try running [nw-trust-flash](https://github.com/szwacz/nw-flash-trust).
* Going back and forth from search to player kills audio.
* Tracklist not fully tested.
* Broken image failovers.

### License

#### PUT IN A LICENSE!!!!



Enjoy!


