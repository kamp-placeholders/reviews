import React from 'react';

// generate object of ratings for a given property
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
	for (var averageMetricKey of averageMetricKeys) {
		averageMetrics[averageMetricKey] /= props.reviews.length;
		averageMetrics[averageMetricKey] = averageMetrics[averageMetricKey].toFixed(1);
	}
	var stars = collectRatings(props.reviews, 'stars', false);
	var totalStars = Object.keys(stars).reduce((acc, cur) => {
		return acc + Number(stars[cur]);
	}, 0);
	var starsProportion = {};
	Object.keys(stars).forEach(key => {
		starsProportion[key] = stars[key] / totalStars * 100;
	});
	return (
		<div className='reviewsSummary'>
			<div className='reviewsCount'>
				What {props.reviews.length} people are saying
			</div>
			<div className='aggregate'>
				<div>
					<div className='description'>
						Overall ratings and reviews
					</div>
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
				</div>
				<div className='aggregateStars'>
					{
						Object.keys(stars).reverse().map(star => (
							<div className='starBar'>
								<span className='star'>
									{star}
								</span>
								<div className='bar'>
									<span style={{'width': `${starsProportion[star]}%`}} className='redBar'></span>
								</div>
							</div>
						))
					}
				</div>
			</div>
		{console.log(stars, totalStars)}
		</div>
	);	
};

module.exports = AggregateReviews;