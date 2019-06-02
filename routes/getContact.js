const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/:latitude/:longitude', async (req, res) => {
	const { latitude, longitude } = req.params;
	const url = `http://127.0.0.1:3000/parse/Users?limit=1&where={"location": {"$nearSphere": {"__type": "GeoPoint","latitude": ${parseFloat(
		latitude
	)},"longitude":${parseFloat(longitude)}}}}`;
	fetch(url, {
		method: 'GET',
		headers: {
			'X-Parse-Application-Id': 'gps-crime-reporting'
		}
	})
		.then(data => data.json())
		.then(data => res.send(data.results[0].contact).status(200))
		.catch(error => console.log(error));
});

module.exports = router;
