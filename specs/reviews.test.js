import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

import Reviews from '../client/components/Reviews.jsx';
import IndividualReviews from '../client/components/IndividualReviews.jsx';
import AggregateReviews from '../client/components/AggregateReviews.jsx';
import sample from '../client/sampleData.js';

describe('Individual Reviews Component', () => {

	var wrapper = shallow(<IndividualReviews reviews={sample} />);
	var reviews = wrapper.find('.review');

	test('there is a review for every object in JSON array', () => {
		expect(reviews).toHaveLength(sample.length);
	});

	test('total number of stars is accurate', () => {
		var renderedStars = reviews.find('[fill="crimson"]');
		var expectedStars = sample.reduce((acc, cur) => {
			return acc + cur.stars
		}, 0);
		expect(renderedStars).toHaveLength(expectedStars);
	});

	test('there is a review toolbar', () => {
		var toolbar = wrapper.exists('.reviewToolbar');
		expect(toolbar).toBe(true);
	});

});

describe('Aggregate Reviews Component', () => {

	var wrapper = shallow(<AggregateReviews reviews={sample} />);
	var reviewsCount = wrapper.exists('.reviewsCount');
	var aggregate = wrapper.exists('.aggregate');

	test('there is a reviewsCount component', () => {
		expect(reviewsCount).toBe(true);
	});

	test('there is an aggregate component', () => {
		expect(aggregate).toBe(true);
	});

	test('average ratings is accurate', () => {
		var renderedRatings = wrapper.find('.overallStars');
		var expectedRatings = (sample.reduce((acc, cur) => {
			return acc + cur.stars;
		}, 0) / sample.length).toFixed(1);
		expect(renderedRatings.text()).toMatch(new RegExp(expectedRatings));
	});

});

describe('Reviews Toolbar Component', () => {

	var wrapper = mount(<Reviews reviews={sample} />);

	test('there is an Individual Reviews component', () => {
		expect(wrapper.exists('.individualReviews')).toBe(true);
	});

	test('there is an Aggregate Reviews component', () => {
		expect(wrapper.exists('.aggregateReviews')).toBe(true);
	});

	test('clicking star bar generates star filter checkbox', () => {
		var bars = wrapper.find('.aggregateStars');
		var bar = bars.findWhere(n => {
			var node = n.getDOMNode();
			return node && node.classList.contains('starBar') && node.dataset.stars === '5';
		});
		expect(bar.exists()).toBe(true);
		expect(wrapper
			.find('.reviewToolbar')
			.findWhere(n => n.getDOMNode() && n.getDOMNode().dataset.isstarfilter === 'true')
			.exists())
			.toBe(false);
		expect(wrapper.state().starFilter).toBe(null);
		bar.simulate('click', { target: { dataset: { stars: '5' }}});
		expect(wrapper.state().starFilter).toBe('5');
		expect(wrapper
			.find('.reviewToolbar')
			.findWhere(n => n.getDOMNode() && n.getDOMNode().dataset.isstarfilter === 'true')
			.exists())
			.toBe(true);
	});

});