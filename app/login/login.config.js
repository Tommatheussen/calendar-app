(function () {
    "use strict";

    angular
        .module("login")
        .config(function ($stateProvider) {
            var loginState = {
                name: "login",
                url: "/login",
                component: "login"
            };

            $stateProvider.state(loginState);
        });
})();