"use strict";

angular.
    module("topToolbar").
    component("topToolbar", {
        templateUrl: "top-toolbar/top-toolbar.tmpl.html",
        controller: topToolbarController,
        controllerAs: "vm"
    });

function topToolbarController(GAuth, GData, $state) {
    var vm = this;

    vm.getUser = GData.getUser;
	vm.goToLogin = goToLogin;
	vm.isLoggedIn = GData.isLogin;

	function goToLogin() {
		if (!$state.is("login")) {
			$state.go("login");
		}
	}
}