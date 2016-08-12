'use strict';

angular.module('calendarApp')
    .config(function ($urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
	});