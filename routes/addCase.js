const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
	const { name, age, type, contact, address, description, latitude, longitude } = req.body;
	const Cases = Parse.Object.extend('Cases');
	const cases = new Cases();

	cases
		.save({ name, age, type, contact, address, description, location: { latitude, longitude } })
		.then(data => res.redirect('/dashboard'))
		.catch(error => console.log(error));
});

module.exports = router;
