/**
 * Open up a new nodewebkit window to use the Oauth2 redirect to get the access token.
 */

$('.login--button').click(function(){
    window.authWin = gui.Window.get(
      window.open(config.baseUrl + '/oauth2/authorize?state=auth&response_type=token&redirect_uri=http%3A%2F%2F127.0.0.1%3A3111/cb&client_id=' + config.clientKey)
    );
});

/** 
 * Use an express server to grab the access token. Close
 * the server when the token is received and start the app.
 */

var app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(app.router);

/**
 * /cb is the route specified by redirect_uri callback above
 */
app.get('/cb', function(req,res){

    window.accessToken = req.query.access_token;
    window.authWin.close();
    window.clientApp.init();

    server.close();

});

var server = app.listen(3111);