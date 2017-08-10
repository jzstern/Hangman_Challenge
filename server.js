// var express = require('express');
// var bodyParser = require("body-parser");
// var app = express();

var app = require('./express');
var bodyParser = require('body-parser');
var express = app.express;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/*', function(req, res) {
//   res.sendFile(path.join(__dirname + '/public/index.html'));
// });

require('./server-parent/app');

app.listen(process.env.PORT || 3000);
// app.listen(3000);