var faker = require('faker');
var fetch = require('node-fetch');

var fakeReview = () => {
	var review = {
		'name': faker.name.firstName(),
		'city': faker.address.city(),
		'stars': faker.random.number() % 6,
		'pastReviews': faker.random.number(),
		'isVIP': faker.random.boolean(),
		'date': `${faker.date.recent().toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}`,
		'review': {
			'post': faker.lorem.paragraph(),
			'overall': faker.random.number() % 6,
			'food': faker.random.number() % 6,
			'service': faker.random.number() % 6,
			'ambience': faker.random.number() % 6
		}
	};
	return review;
}

for (let i = 0; i < 15; i++) {
	fetch('http://localhost:3004/api/reviews', { 
		method: 'POST',
		headers: {
			'content-type': 'application/json'		
		},
		body: JSON.stringify(fakeReview())
	})
}