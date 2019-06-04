const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
	const { username, password } = req.body;

	Parse.User.enableUnsafeCurrentUser();
	Parse.User.logIn(username, password).then(user => {
		Parse.User.become(req.body.sessionToken)
			.then(response => res.redirect('/dashboard'))
			.catch(error => console.log(error));
	});
});

module.exports = router;
