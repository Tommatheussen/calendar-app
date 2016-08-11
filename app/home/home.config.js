'use strict';

angular
	.module('home')
    .config(function ($urlRouterProvider, $stateProvider) {
        var homeState = {
            name: 'home',
            url: '/',
			component: 'home'
        }

        $stateProvider.state(homeState);
	});