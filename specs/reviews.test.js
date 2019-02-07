import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

import Reviews from '../client/components/reviews.jsx';
import sample from '../client/sampleData.js';

describe('Reviews Component', () => {

	var wrapper = shallow(<Reviews reviews={sample} />);
	var reviews = wrapper.find('div.review');

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

});