import React from 'react';
import fetch from 'node-fetch';

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

// helper function
var includesAll = (str, arr) => {
    return arr.every(e => str.includes(e))
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
			reviews: this.props.reviews,
			filteredReviews: this.props.reviews,
			foods: {},
			filteredFoods: {},
			checkedFoods: new Set()
		};
		this.updateSort = this.updateSort.bind(this);
		this.highlightText = this.highlightText.bind(this);	
		this.applyFilter = this.applyFilter.bind(this);	
		this.countDish = this.countDish.bind(this);	
	}

	componentDidMount() {
		this.updateFoods();
		this.updateFilteredFoods();
	}

	updateFoods() {
		var foods = this.state.foods;
		this.state.filteredReviews.forEach(review => {
			fetch('/api/foodtext', {
				method: 'POST',
				headers: { 'ContentType': 'plain/text' },
				body: review.review.post
			})
			.then(res => res.json())
			.then(json => {
				json.annotations.forEach(a => {
					foods[a.annotation] = foods[a.annotation] ? foods[a.annotation] + 1 : 1;
				})
				this.setState({ foods: foods });
			})
			.catch(() => {})
		})
	}

	updateFilteredFoods() {
		var foods = {};
		this.state.filteredReviews.forEach(review => {
			fetch('/api/foodtext', {
				method: 'POST',
				headers: { 'ContentType': 'plain/text' },
				body: review.review.post
			})
			.then(res => res.json())
			.then(json => {
				json.annotations.forEach(a => {
					foods[a.annotation] = foods[a.annotation] ? foods[a.annotation] + 1 : 1;
				})
				this.setState({ filteredFoods: foods });
			})
			.catch(() => {})
		})
	}

	updateSort(e) {
		switch(e.target.value) {
			case 'newest':
				var sorted = this.state.filteredReviews;
				sorted.sort((a, b) => (new Date(b.date) - new Date(a.date)))
				this.setState({ filteredReviews: sorted });
				break;
			case 'highest':
				var sorted = this.state.filteredReviews;
				sorted.sort((a, b) => (b.stars - a.stars));
				this.setState({ filteredReviews: sorted });
				break;
			case 'lowest':
				var sorted = this.state.filteredReviews;
				sorted.sort((a, b) => (a.stars - b.stars));
				this.setState({ filteredReviews: sorted });
				break;
		}
	}

	highlightText(text, highlight) {
		var parts = text.split(new RegExp(`(${highlight.join('|')})`, 'gi'));
		return (
			<span className='post'>
				{
					parts.map(part => highlight.includes(part.toLowerCase()) ? <b>{part}</b> : part)
				}
			</span>
		);
	}

	applyFilter(e) {
		var name = e.target.dataset.name;
		var filtered;
		var checkedFoods = this.state.checkedFoods;
		if (Array.from(checkedFoods).includes(name)) {
			checkedFoods.delete(name);
		} else {
			checkedFoods.add(name);
		}
		filtered = this.state.reviews.filter(a => includesAll(a.review.post.toLowerCase(), Array.from(checkedFoods)));	
		this.setState({ filteredReviews: filtered, checkedFoods: checkedFoods }, this.updateFilteredFoods);
	}

	countDish(dish) {
		return this.state.filteredReviews.reduce((acc, cur) => {
			return acc + cur.review.post.toLowerCase().includes(dish);
		}, 0);
	}

	topFoods() {
		var foods = this.state.filteredFoods;
		var sorted = Object.keys(foods).sort((a, b) => foods[b] - foods[a]);
		return sorted.slice(0, 4);
	}

	render() {
		return (
			<div>
				<div className='reviewToolbar'>
					<div className='sortBy'>Sort by</div>
						<select onChange={this.updateSort}>
							<option value='newest'>Newest</option>
							<option value='highest'>Highest rating</option>
							<option value='lowest'>Lowest rating</option>
						</select>
					<div className='filters'>Filters</div>
					{ 
						this.topFoods().map(food => (
							<span 
								onClick={this.applyFilter} 
								data-name={food} 
								className={Array.from(this.state.checkedFoods).includes(food) ? 'selected' : 'unselected'}
							>
								{food} ({ this.countDish(food) }) 
							</span>
						)) 
					}
				</div>
				{
					this.state.filteredReviews.map(review => (
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
								{
									this.highlightText(review.review.post, Array.from(this.state.checkedFoods))
								}
							</div>
						</div>
					))
				}
			</div>
		);
	}
};

module.exports = IndividualReviews;