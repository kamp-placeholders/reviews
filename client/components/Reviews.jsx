import React from 'react';

import AggregateReviews from './AggregateReviews.jsx';
import IndividualReviews from './IndividualReviews.jsx';
import '../style.css';

var port = process.env.PORT || 8081;

class Reviews extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			reviews: this.props.reviews,
			starFilter: null
		};
		this.updateStarFilter = this.updateStarFilter.bind(this);
	}

	componentWillMount() {
		var restaurant_id = window.location.pathname.split('/')[1] !== '' ? Number(window.location.pathname.split('/')[1]) : 1;
  	fetch(`http://localhost:${port}/api/reviews`, { method: 'GET' })
			.then(res => res.json())
			.then(json => {
				// console.log(json)
				console.log(this.peel(json, restaurant_id))
				var data = this.peel(json, restaurant_id)
				this.setState({ reviews: data })
			})
			.catch(err => console.error(err))
	}

	updateStarFilter(star) {
		this.setState({ starFilter: star });
	}

	peel(arr, id) {
		return arr.reduce((acc, cur) => {
			acc.push(JSON.parse(cur.jdoc));
			return acc;
		}, [])
		.filter(e => e.restaurant_id === id);		
	}

	render() {
		return (
			<div>
				<AggregateReviews 
					reviews={this.state.reviews} 
					updateStarFilter={this.updateStarFilter} 
				/>
				<IndividualReviews 
					reviews={this.state.reviews} 
					updateStarFilter={this.updateStarFilter} 
					starFilter={this.state.starFilter} 
				/>
			</div>
		);
	}
}

module.exports = Reviews;