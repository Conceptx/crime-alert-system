const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const api = new ParseServer({
	databaseURI: 'mongodb://caszw:caszw2019@ds016118.mlab.com:16118/caszw',
	cloud: __dirname + '/cloud/main.js',
	serverURL: 'https://caszw.herokuapp.com/parse',
	appId: 'gps-crime-reporting',
	masterKey: 'gps-crime-reporting'
});

const app = express();
app.use('/public', express.static(path.join(__dirname, 'public')));

// Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

// Serve the Parse API on the /parse URL prefix
const mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Imported Routes
app.use('/auth', require('./routes/auth'));
app.use('/addStation', require('./routes/addStation'));
app.use('/getContact', require('./routes/getContact'));
app.use('/addCase', require('./routes/addCase'));
app.use('/getCases', require('./routes/getCases'));
app.use('/getStatistics', require('./routes/getStatistics'));

// Local Routes
app.get('/login', (req, res) => {
	res.sendFile(path.join(__dirname, '/public/login-page.html'));
});

app.get('/dashboard', (req, res) => {
	res.sendFile(path.join(__dirname, '/public/dashboard.html'));
});

app.get('/map', (req, res) => {
	res.sendFile(path.join(__dirname, '/public/map.html'));
});

app.get('/cases', (req, res) => {
	res.sendFile(path.join(__dirname, '/public/tables.html'));
});

app.get('/new/user', (req, res) => {
	res.sendFile(path.join(__dirname, '/public/new-user.html'));
});

app.get('/new/case', (req, res) => {
	res.sendFile(path.join(__dirname, '/public/new-case.html'));
});

app.get('/logout', (req, res) => {
	res.redirect('/login');
});

app.get('/', (req, res) => {
	res.json({ status: 'alive' });
});

const httpServer = require('http').createServer(app);
httpServer.listen(process.env.PORT || 3000, function() {
	console.log(
		'GPS Crime Reporting System Dashboard Running On Port ' + process.env.PORT || 3000 + '.'
	);
});
