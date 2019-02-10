const puppeteer = require('puppeteer');
const pageUrl = 'http://localhost:3004/';

let page;
let browser;
const width = 1280;
const height = 720;

beforeAll(async () => {
	browser = await puppeteer.launch({
		headless: true,
		slowMo: 80,
		args: [`--window-size=${width},${height}`]
	});
	page = await browser.newPage();
	await page.setViewport({ width, height });
});

afterAll(() => {
	browser.close();
});

describe('reviews', () => {

	beforeEach(async () => {
		await page.goto(pageUrl, {waitUntil: 'domcontentloaded'});
	});

	test('authors exist', async () => {
		var selector = '.review .profile .author';
		const authors = await page.$$eval(selector, divs => divs.map(div => div.textContent));
		expect(authors.length > 0).toBe(true);
		authors.forEach(author => console.log('AUTHOR:', author))
	});

});