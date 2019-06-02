const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
	const { name, age, type, contact, address, description, location } = req.body;
	const Cases = Parse.Object.extend('Cases');
	const cases = new Cases();

	cases
		.save({ name, age, type, contact, address, description, location })
		.then(data => res.json({ success: true, id: data.id }))
		.catch(error => console.log(error));
});

module.exports = router;
