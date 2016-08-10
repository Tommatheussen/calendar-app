'use strict';

angular.module('calendarApp')
	.run(function (GAuth, GApi, GData) {
		var CLIENT = '576434137862-eb52i5mrh8lag6tpnsrpviqjfntprnq3.apps.googleusercontent.com';

        console.log('run');        
        
        GApi.load('calendar', 'v3')
            .catch(function (api, version) {
                console.log('error occured', api, version)
            });
		GAuth.setClient(CLIENT);
        GAuth.setScope('https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/calendar');
        
        GAuth.checkAuth().then(function () {
            console.log('done');
        }, function (error) {
            console.log('not done', error);
        })
	});