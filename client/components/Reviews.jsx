import React from 'react';

import AggregateReviews from './AggregateReviews.jsx';
import IndividualReviews from './IndividualReviews.jsx';
import '../style.css';

class Reviews extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			starFilter: null
		};
		this.updateStarFilter = this.updateStarFilter.bind(this);
	}

	updateStarFilter(star) {
		this.setState({ starFilter: star });
	}

	render() {
		return (
			<div>
				<AggregateReviews 
					reviews={this.props.reviews} 
					updateStarFilter={this.updateStarFilter} 
				/>
				<IndividualReviews 
					reviews={this.props.reviews} 
					updateStarFilter={this.updateStarFilter} 
					starFilter={this.state.starFilter} 
				/>
			</div>
		);
	}
}

module.exports = Reviews;