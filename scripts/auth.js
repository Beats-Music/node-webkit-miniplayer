$('.login--button').click(function(){
    window.authWin = gui.Window.get(
      window.open(config.baseUrl + '/oauth2/authorize?state=auth&response_type=token&redirect_uri=http%3A%2F%2F127.0.0.1%3A3111&client_id=' + config.clientAuthKey)
    );
});

var app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(app.router);

app.get('/services.php', function(req,res){
    console.log(req.query);

    window.accessToken = req.query.access_token;
    window.authWin.close();
    window.clientApp.init();

    app.close();
});

app.listen(3111);