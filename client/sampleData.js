var faker = require('faker');

var reviews = [
{
	'name': faker.name.firstName(),
	'city': 'San Francisco',
	'stars': 4,
	'pastReviews': 2,
	'isVIP': false,
	'date': '1/26/2019',
	'review': {
		'post': `Food was all quite good, felt clean and balanced tastes. Bread however should have definitely been served warm.`,
		'overall': 4,
		'food': 4,
		'service': 4,
		'ambience': 4
	}
},
{
	'name': 'MVeeC',
	'city': 'New York Area',
	'stars': 5,
	'pastReviews': 5,
	'isVIP': true,
	'date': '1/25/2019',
	'review': {
		'post': `Outstanding and consistently so.
Garrett was a great server, oyster maven!`,
		'overall': 5,
		'food': 5,
		'service': 5,
		'ambience': 5
	}
},
{
	'name': 'lowercasetest',
	'city': 'Mongolia',
	'stars': 0,
	'pastReviews': 15,
	'isVIP': true,
	'date': '1/2/2019',
	'review': {
		'post': `hello i only type in lowercase letters`,
		'overall': 5,
		'food': 3,
		'service': 1,
		'ambience': 1
	}
}
];

module.exports = reviews;