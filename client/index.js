import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App.jsx';
import sample from './sampleData.js';

fetch('/api/reviews', { method: 'GET' })
	.then(res => res.json())
	.then(json => {
		// console.log(json)
		// console.log(peel(json))
		var data = peel(json)
		ReactDOM.render(<App reviews={data} />, document.getElementById('reviews'));
	})
	.catch(err => console.error(err))

var peel = (arr) => {
	return arr.reduce((acc, cur) => {
		acc.push(JSON.parse(cur.jsdoc));
		return acc;
	}, []);
};