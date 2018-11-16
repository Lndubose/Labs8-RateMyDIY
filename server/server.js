// DEPENDENCIES
const express = require('express');

const server = express();

const db = require('./config/dbConfig');
const twilio = require('twilio'); 
const accountSid = "AC5015bf59d92c66d960602ce3a51d6e1d";
const authToken = "df07b21ee914b8532f3dbc78fd8e32e8"; 
const client = new twilio(accountSid, authToken);

// MIDDLEWARE
const configureMiddleware = require('./config/middleware');

configureMiddleware(server);

// // ROUTES
// const exampleRoutes = require('./routes/exampleRoutes');

// SANITY CHECK
server.get('/', (req, res) => {
	res.send(
		`Believe it or not, this is the first endpoint added to the great RateMyDIY project.`
	);
});

server.get('/hello', (req, res) => {
	console.log('hey');
	res.send('hi');
});


const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const postRoutes = require('./routes/postRoutes');

server.use('/api/users', userRoutes);
server.use('/api/projects', projectRoutes);
server.use('/api/posts', postRoutes);




//Twilio 
server.get('/send-text', (req, res) => {
    //Welcome Message
    res.send('Hello to the Twilio Server')

    //_GET Variables
    const { recipient, textmessage } = req.query;


    //Send Text
    client.messages.create({
        body: textmessage,
        to: recipient,  // Text this number
        from: '+15625219688 ' // From a valid Twilio number
    }).then((message) => console.log(message.sid));
})














// server.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


// // Error handlers
// // Catch 404 and forward to error handler
// server.use(function(req, res, next) {
// 	const err = new Error('Not Found');
// 	err.status = 404;
// 	next(err);

// });

// // Development error handler
// // Will print stacktrace

// if (server.get('env') === 'development') {
// 	server.use(function(err, req, res, next) {
// 		res.status(err.status || 500);
// 		res.json({
// 			message: err.message,
// 			error: err
// 		});
// 	});

// }

// // Production error handler
// // No stacktraces leaked to user
// server.use(function(err, req, res, next) {

// 	res.status(err.status || 500);
// 	res.json({
// 		message: err.message,
// 		error: {}
// 	});

// });

module.exports = server;
