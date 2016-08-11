'use strict';

angular
	.module('home')
	.component('home', {
        templateUrl: 'home/home.tmpl.html',
        controller: homeController,
        controllerAs: 'vm',
		bindings: {
			flex: '='
		}
    });

function homeController(GAuth, GData, $state) {
    var vm = this;
}