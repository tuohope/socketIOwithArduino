var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });

  res.sendfile('index.html');

});

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

module.exports = router;
