'use strict';

angular.module('calendar')
	.config(function ($stateProvider) {        
        var calendarState = {
            name: 'calendar',
            url: '/calendar',
            component: 'calendar'
        };

        $stateProvider.state(calendarState);
	});