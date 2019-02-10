import React from 'react';
import ReactDOM from 'react-dom';

import Reviews from './components/reviews.jsx';
import sample from './sampleData.js';

ReactDOM.render(<Reviews reviews={sample} />, document.getElementById('reviews'));