var faker = require('faker');
var fetch = require('node-fetch');

console.log(process.argv);
// node seed.js [SEED_AMOUNT]

var SEED_AMOUNT = process.argv[2] || 5;

var fakeReview = (cb) => {
	fetch('http://baconipsum.com/api?type=meat-and-filler&sentences=2')
		.then(res => res.text())
		.then(text => {
			var lorem = text.slice(2, text.length - 2);
			var review = {
				'name': faker.name.firstName(),
				'city': faker.address.city(),
				'stars': faker.random.number() % 5 + 1,
				'pastReviews': faker.random.number(),
				'isVIP': faker.random.boolean(),
				'date': `${faker.date.past().toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}`,
				'review': {
					'post': lorem,
					'overall': faker.random.number() % 5 + 1,
					'food': faker.random.number() % 5 + 1,
					'service': faker.random.number() % 5 + 1,
					'ambience': faker.random.number() % 5 + 1
				}
			};
			cb(review);
		})
}

for (let i = 0; i < SEED_AMOUNT; i++) {
	fakeReview((review) => {
		fetch('http://localhost:3004/api/reviews', { 
			method: 'POST',
			headers: {
				'content-type': 'application/json'		
			},
			body: JSON.stringify(review)
		})
	})
}

console.log(`SEEDED ${SEED_AMOUNT} MORE`);