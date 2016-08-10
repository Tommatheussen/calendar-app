'use strict';

angular.
    module('topToolbar').
    component('topToolbar', {
        templateUrl: 'top-toolbar/top-toolbar.tmpl.html',
        controller: topToolbarController,
        controllerAs: 'vm'
    });

function topToolbarController(GAuth, GData, $state) {
    var vm = this;
 
    vm.doLogout = doLogout;
    vm.getUser = GData.getUser;

    function doLogout() {
        GAuth.logout().then(function () {
            //TODO: Remove cookies
            $state.go('login');
        });
    }
}