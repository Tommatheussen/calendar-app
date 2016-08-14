"use strict";

angular.
    module("login").
    component("login", {
        templateUrl: "login/login.tmpl.html",
        controller: loginController,
        controllerAs: "vm",
		bindings: {
			flex: "="
		}
    });

function loginController(GAuth, GData, $state) {
    var vm = this;

    vm.$onInit = onInit;
    vm.doLogin = doLogin;

    function onInit() {
        GData.isLogin() ? isLoggedIn() : null;
    }

    function isLoggedIn() {
        // $cookies.put
        //TODO: Set cookies
        console.log("user is: ", GData.getUser());
        $state.go("calendar");
    }

    function doLogin() {
        GAuth.checkAuth().then(function () {
            isLoggedIn();
        }, function () {
            GAuth.login().then(function () {
                isLoggedIn();
            });
        });
    }
}