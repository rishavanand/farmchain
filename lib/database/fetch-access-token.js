'use strict';

var {
	google
} = require("googleapis");

// Load the service account key JSON file.
var serviceAccount = require("../../config/firebase-adminsdk.json");

// Define the required scopes.
var scopes = [
	"https://www.googleapis.com/auth/userinfo.email",
	"https://www.googleapis.com/auth/firebase.database"
];

// Authenticate a JWT client with the service account.
var jwtClient = new google.auth.JWT(
	serviceAccount.client_email,
	null,
	serviceAccount.private_key,
	scopes
);

var getToken = () => {

	return new Promise((resolve, reject) => {

		// Use the JWT client to generate an access token.
		jwtClient.authorize(function (error, tokens) {
			if (error) {
				return reject(error);
			} else if (tokens.access_token === null) {
				return reject(new Error("Provided service account does not have permission to generate access tokens"));
			} else {
				var accessToken = tokens.access_token;
				process.env.googleAccessToken = accessToken;
				return resolve(tokens.access_token);
			}
		});

	});

}

module.exports = getToken;