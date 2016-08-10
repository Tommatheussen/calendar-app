'use strict';

angular.module('calendarApp')
    .config(function ($urlRouterProvider, $stateProvider) {
        var homeState = {
            name: 'home',
            url: '/',
            onEnter: ['GAuth', '$state', function (GAuth, $state) {
                GAuth.checkAuth().then(function (user) {
                    console.log(user);
                    $state.go('calendar');
                }, function (error) {
                    $state.go('login');
                });
            }]
        }

        $stateProvider.state(homeState);
        $urlRouterProvider.otherwise('/');
	});