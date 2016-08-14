"use strict";

angular.module("calendar")
	.config(function ($stateProvider) {
        var calendarState = {
            name: "calendar",
            url: "/",
            component: "calendar"
        };

        $stateProvider.state(calendarState);
	});