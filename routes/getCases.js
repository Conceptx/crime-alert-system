const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	const query = new Parse.Query('Cases');
	query
		.find()
		.then(cases => res.json({ success: true, cases }))
		.catch(error => console.log(error));
});

module.exports = router;
