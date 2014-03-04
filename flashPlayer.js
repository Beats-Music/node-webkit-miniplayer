var express = require('express');
var app = express();
var exphbs  = require('express3-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.urlencoded());
app.use(express.json());
app.use(app.router);

app.use(express.static('./components'));
app.use(express.static('./views/layouts'));
app.use(express.static('./assets'));

var player = {};

app.get('/player', function(req,res){

    player = {
        serverURL: req.query.server_url,
        url: req.query.url,
        artist: req.query.artist,
        title: req.query.title
    }

    res.render('flashPlayer', player);
});

var server = app.listen(3112);

// var io = require('socket.io').listen(server);

// io.sockets.on('connection', function (socket) {

//     socket.emit('connected', {
//         'connected': 'track'
//     });

//     socket.on('prevTrack', function (data) {
//       console.log(data);
//       //TODO: Add call to API
//     });

//     socket.on('nextTrack', function (data) {
//       console.log(data);
//       //TODO: Add call to API
//     });
// });

// <script src="/socket.io/socket.io.js"></script>

// <script>
//   var socket = io.connect('http://localhost:3112');
//   socket.on('connect', function (data) {
//     console.log(data);
//     // socket.emit();
//   });
// </script>







