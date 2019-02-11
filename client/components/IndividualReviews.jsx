import React from 'react';

// SVG template for rating stars
var star = (color) => ( 
	<svg height="16px" width="16px" viewBox="-1 -1 2 2">
	  <polygon points="0,-1 .588,.809 -.95,-.31 .95,-.31 -.588,.809"
	  fill={color} />
	</svg>
);

// genererate star rating
var fillStars = (red) => {
	var stars = Array(5);
	stars.fill(star('crimson'), 0, red);
	stars.fill(star('lightGray'), red);
	return stars;
};

// helper function
var isUpperCase = (char) => {
	return char != char.toLowerCase();
};

// generate max two character representation of username
var shortenName = (name) => {
  var caps = name.split('').reduce((acc, cur) => {
    if (isUpperCase(cur) && acc.length < 2) acc.push(cur);
		return acc;
  }, []);
  caps = (caps.length === 0) ? name[0] : caps.join('');
	return caps;
};

// generate circle color based on name
var circleColorRoulette = (name) => {
	var red = name.charCodeAt(0) % 256;
	var green = name.charCodeAt(name.length - 1) % 256;
	var blue = name.charCodeAt(~~(name.length / 2)) % 256;
	var colors = `rgb(${red},${green},${blue})`;
	return colors;
};

class IndividualReviews extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			reviews: this.props.reviews
		};
		this.updateSort = this.updateSort.bind(this);
	}

	updateSort(e) {
		switch(e.target.value) {
			case 'newest':
				var sorted = this.state.reviews;
				sorted.sort((a, b) => (new Date(b.date) - new Date(a.date)))
				this.setState({ reviews: sorted });
				break;
			case 'highest':
				var sorted = this.state.reviews;
				sorted.sort((a, b) => (b.stars - a.stars));
				this.setState({ reviews: sorted });
				break;
			case 'lowest':
				var sorted = this.state.reviews;
				sorted.sort((a, b) => (a.stars - b.stars));
				this.setState({ reviews: sorted });
				break;
		}
	}

	render() {
		return (
			<div>
				<div className='reviewToolbar'>
					<div>Sort by</div>
					<select onChange={this.updateSort}>
						<option value='newest'>Newest</option>
						<option value='highest'>Highest rating</option>
						<option value='lowest'>Lowest rating</option>
					</select>
				</div>
				{
					this.state.reviews.map(review => (
						<div className='review'>
							<div className='profile'>
								<div className='circle' style={{'backgroundColor': circleColorRoulette(review.name)}}>
									{shortenName(review.name)}
								</div>
								<div className='author'>
									{review.name}
								</div>
								<div className='city'>
									{review.city}
								</div>
								<div className='pastReviews'>
									{`${review.pastReviews} reviews`}
								</div>
							</div>
							<div className='userReview'>
								<div className='banner'>
									<div className='starsAndDate'>
										<div className='stars'>
											{fillStars(review.stars)}
										</div>
										<div className='date'>
											{review.date}
										</div>
									</div>
									<div className='ratings'>
										Overall
										<div className='overall'>
											{review.review.overall}
										</div>
										Food
										<div className='food'>
											{review.review.food}
										</div>
										Service
										<div className='service'>
											{review.review.service}
										</div>
										Ambience
										<div className='ambience'>
											{review.review.ambience}
										</div>
									</div>
								</div>
								<div className='post'>
									{review.review.post}
								</div>
							</div>
						</div>
					))
				}
			</div>);
	}
};

module.exports = IndividualReviews;