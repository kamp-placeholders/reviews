const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3004;

const db = require('./db');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/reviews', (req, res) => {
	db.get((results) => {
		res.send(results);
	});
});

app.delete('/api/reviews', (req, res) => {
	db.deleteTable((results) => {
		res.send(results);
	});
});

app.post('/api/reviews', parser.json(), (req, res) => {
	console.log('JSON:', req.body);
	db.post(req.body, (results, err) => {
		if (err) {
			console.error(err);
			res.send(400);
		} else {
			console.log('posted');
			res.send(results);
		}
	});
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});