const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
	const newUser = new Parse.User();
	const { station, contact, latitude, longitude, password } = req.body;
	const location = new Parse.GeoPoint({
		latitude,
		longitude
	});

	newUser
		.signUp({ username: station, contact, location, password })
		.then(data => res.json({ success: true, id: data.id }))
		.catch(error => console.log(error));
});

module.exports = router;
