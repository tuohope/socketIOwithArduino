var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
var five = require('johnny-five');



var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var myBoard = new five.Board({
    port:"COM4",
    repl: false,
    debug: false})

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);


var ledon = true;
var led;
myBoard.on("ready", function () {
    console.log("Arduino is ready.");

    var led = new five.Led(13);
    led.on();

    io.on('connection', function (socket) {
        socket.on('buttonPress',function () {
            console.log("buttonPressed!");


            // led.toggle();

            if (ledon){
                led.off();
                ledon = false;
                io.emit("ledState", "LED IS CURRENTLY OFF");
            }else{
                led.on();
                ledon = true;
                io.emit("ledState", "LED IS CURRENTLY ON");
            }
        })
    })
})

// io.on('connection', function(socket){
//     console.log('a user connected');
//
//     socket.on('chat message', function(msg){
//         console.log('message: ' + msg);
//         io.emit('chat message', msg);
//     });
//
//     socket.on('disconnect', function(){
//         console.log('user disconnected');
//     });
// });


http.listen(3000, '192.168.1.5',function(){
    console.log('listening on *:3000');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
