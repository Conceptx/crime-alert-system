const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	const types = [
		'theft',
		'dui',
		'assault',
		'battery',
		'rape',
		'hit and run',
		'robbery',
		'arson',
		'burglary'
	];
	const results = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	const query = Parse.Object.extend('Cases');

	types.map(async (value, i) => {
		query.equalTo('type', value);
		const count = await query.count();
		results[i] = count;
	});

	res.json({ success: true, results });
});

module.exports = router;
