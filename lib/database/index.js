'use strict';

var fetch = require('node-fetch');

var getUser = async (mobileNumber) => {

	let firebaseUrl = global.gConfig.firebaseUrl;
	let googleAccessToken = process.env.googleAccessToken;
	let result = await fetch(`${firebaseUrl}/users.json?access_token=${googleAccessToken}&print=pretty`);
	result = await result.json();
	return result;

}

var createUser = async (userData) => {

	let firebaseUrl = global.gConfig.firebaseUrl;
	let googleAccessToken = process.env.googleAccessToken;
	let result = await fetch(`${firebaseUrl}/users/${userData.username}.json?access_token=${googleAccessToken}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(userData)
	});
	result = await result.json();
	return result;

}

module.exports = {
	fetchToken: require('./fetch-access-token'),
	getUser: getUser,
	createUser: createUser
}