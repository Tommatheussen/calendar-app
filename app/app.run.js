'use strict';

angular.module('calendarApp')
	.run(function (GAuth, GApi, GData) {
		var CLIENT = '576434137862-eb52i5mrh8lag6tpnsrpviqjfntprnq3.apps.googleusercontent.com';

		GApi.load('calendar', 'v3');
		GAuth.setClient(CLIENT);
		GAuth.setScope('https://www.googleapis.com/auth/calendar');

		GAuth.load();

		/*GAuth.login().then(function (user) {
			console.log(user);
		}, function (error) {
			console.log(error);
		});*/
		/*GAuth.checkAuth().then(function (user) {
			console.log(user);
		}, function (err) {
			console.log(err);
		});*/
	});