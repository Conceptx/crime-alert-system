const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const types = [""];
    const results = [];
    const query = Parse.Object.extend('Cases');

    types.map((value, i) => {
        query.equalTo('type', value);
        const count = await query.count();
        results.push(count);
    });

    res.json({success: true, results})
});

router.get('/:type', async (req, res) => {
	const { type } = req.params;
	const query = Parse.Object.extend('Cases');

	query.equalTo('type', type);
	const count = await query.count();

	res.json({ success: true, count });
});

module.exports = router;
