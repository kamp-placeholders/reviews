const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3004;

const db = require('./db');
const foodProcessorAPI_KEY = require('./foodparser.config.js');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

app.use(cors());

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