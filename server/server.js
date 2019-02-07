const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3004;

const db = require('./db');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/api', (req, res) => {
	db.get((results) => {
		res.send(results);
	})
})

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});