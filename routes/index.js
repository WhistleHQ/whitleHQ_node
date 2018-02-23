var express = require('express');
var router = express.Router();
var path = require('path');
const sendmail = require('sendmail')({
  logger: {
    debug: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error
  },
  silent: false
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views/index.html'));
 //  res.sendfile('index.html')
	// sendmail({
	//     from: 'no-reply@whistlehq.com',
	//     to: 'k.chetan92@gmail.com',
	//     subject: 'test sendmail',
	//     html: 'Yolo',
	//   }, function(err, reply) {
	//     console.log(err && err.stack);
	//     console.dir(reply);
	// });
});

module.exports = router;
