'use strict';

angular.module('calendarApp')
    .config(function ($urlRouterProvider, $stateProvider) {
        var homeState = {
            name: 'home',
            url: '/',
            onEnter: function (GAuth, $state) {
                GAuth.checkAuth().then(function (user) {
                    $state.go('calendar');
                }, function (error) {
                    $state.go('login');
                });
            }
        }

        $stateProvider.state(homeState);
        $urlRouterProvider.otherwise('/');
	});