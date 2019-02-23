const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8081;

const db = require('./db');
const foodProcessorAPI_KEY = require('./foodparser.config.js');
const public = path.join(__dirname, '../public');
const fakeReview = require('../seed.js');

app.use(cors());

app.use(morgan('dev'));
app.use('/', express.static(public));
app.use('/(\\d+)/', express.static(public));


app.get('/api/reviews', (req, res) => {
	console.log('PUBLIC:', public);
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

app.post('/api/seed', parser.text(), (req, res) => {
	var SEED_AMOUNT = typeof +req.body === 'number' ? +req.body : 5;
	console.log('SEEDING:', SEED_AMOUNT);
	for (let i = 0; i < SEED_AMOUNT; i++) {
		for (let j = 0; j < 5; j++) {
			fakeReview(i, (review) => {
				db.post(review, (results, err) => {
					if (err) {
						console.error(err);
						res.send(400);
					}
				});
			})
		}
	}
	res.send((SEED_AMOUNT).toString());
});

app.post('/api/foodtext', parser.text(), (req, res) => {
	console.log('FOODTEXT:', req.body);
	fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/detect', {
		method: 'POST', 
		headers: {
			'X-RapidAPI-Key': foodProcessorAPI_KEY,
			'ContentType': 'application/x-www-form-urlencoded'
		},
		body: `text=${req.body}`
	})
	.then(res => res.json())
	.then(json => res.send(json))
	.catch(err => res.send(404))
})

app.listen(port, () => {
  console.log(`Express reviews server running at: http://localhost:${port}`);
});