'use strict';

angular.module('calendar')
	.config(function ($stateProvider) {        
        var calendarState = {
            name: 'calendar',
            url: '/calendar',
            template: '<h3>Calendar</h3>'
        };

        $stateProvider.state(calendarState);
	});