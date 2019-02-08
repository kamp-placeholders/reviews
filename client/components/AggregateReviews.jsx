import React from 'react';

// generate array of ratings for a given property
var collectRatings = (arr, property, isReviewProperty) => {
	var ratings = {};
	arr.forEach(review => {
		if (isReviewProperty) {
			ratings[review.review[property]] = ratings[review.review[property]] ? ratings[review.review[property]] + 1 : 1;
		} else {
			ratings[review[property]] = ratings[review[property]] ? ratings[review[property]] + 1 : 1;
		}
	});
	return ratings;
};

// delete unwanted property from object
var neuter = (obj, property) => {
	var clone = Object.assign({}, obj);
	delete clone[property];
	return clone;
};

// helper function
var avg = (arr) => {
	return arr.reduce((acc, cur) => acc + cur) / arr.length;
};

var AggregateReviews = (props) => {
	var metrics = props.reviews.map(review => neuter(review.review, 'post'));
	var averageMetrics = {};
	metrics.forEach(metric => {
		var keys = Object.keys(metric);
		for (var key of keys) {
			averageMetrics[key] = averageMetrics[key] ? averageMetrics[key] + metric[key] : metric[key];
		}
	});
	var averageMetricKeys = Object.keys(averageMetrics);
	for (var averageMetricKey of Object.keys(averageMetrics)) {
		averageMetrics[averageMetricKey] /= props.reviews.length;
		averageMetrics[averageMetricKey] = averageMetrics[averageMetricKey].toFixed(1);
	}
	return (
		<div className='reviewsSummary'>
			Overall ratings and reviews
			<div className='metrics'>
				{
					averageMetricKeys.map(averageMetric => (
						<div className='metric'>
							<div className='metricValue'>
								{averageMetrics[averageMetric]}
							</div>
							<div className='metricName'>
								{averageMetric}
							</div>
						</div>
					))
				}
			</div>
			{console.log(collectRatings(props.reviews, 'stars', false))}
		</div>
	);	
};

module.exports = AggregateReviews;