import React from 'react';
import ReactDOM from 'react-dom';

import Reviews from './components/Reviews.jsx';

window.Reviews = Reviews;

ReactDOM.render(
	<Reviews />, 
	document.getElementById('reviews')
);