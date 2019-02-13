import React from 'react';

import AggregateReviews from './AggregateReviews.jsx';
import IndividualReviews from './IndividualReviews.jsx';

var App = (props) => (
	<div>
		<AggregateReviews reviews={props.reviews} />
		<IndividualReviews reviews={props.reviews} />
	</div>
);

module.exports = App;