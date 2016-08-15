"use strict";

angular.module("calendarApp")
    .config(function ($urlRouterProvider, $analyticsProvider) {
        $urlRouterProvider.otherwise("/");
        $analyticsProvider.trackExceptions(true);
	});