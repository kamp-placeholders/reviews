import React from 'react';

import AggregateReviews from './AggregateReviews.jsx';
import IndividualReviews from './IndividualReviews.jsx';
import '../style.css';

var port = process.env.PORT || 3004;

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
  	fetch(`http://localhost:${port}/api/reviews`, { method: 'GET' })
			.then(res => res.json())
			.then(json => {
				// console.log(json)
				// console.log(this.peel(json))
				var data = this.peel(json)
				this.setState({ reviews: data })
			})
			.catch(err => console.error(err))
	}

	updateStarFilter(star) {
		this.setState({ starFilter: star });
	}

	peel(arr) {
		return arr.reduce((acc, cur) => {
			acc.push(JSON.parse(cur.jdoc));
			return acc;
		}, []);		
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