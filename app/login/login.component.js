'use strict';

angular.
    module('login').
    component('login', {
        templateUrl: 'login/login.tmpl.html',
        controller: loginController,
        controllerAs: 'vm'
    });

function loginController(GAuth) {
    var vm = this;

    vm.doLogin = function () {
        GAuth.login().then(function () {
            console.log('logged in');
        });
    }
}