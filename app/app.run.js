(function () {
    "use strict";

    angular
        .module("calendarApp")
        .run(appRun);

    function appRun(GAuth, GApi, $state, $transitions, $q) {
        var CLIENT = "576434137862-eb52i5mrh8lag6tpnsrpviqjfntprnq3.apps.googleusercontent.com";

        GApi.load("calendar", "v3")
            .catch(function (api, version) {
                console.log("error occured", api, version);
            });

        GAuth.setClient(CLIENT);
        GAuth.setScope("https://www.googleapis.com/auth/calendar");

        $transitions.onBefore({ to: "calendar" }, function () {
            var deferred = $q.defer();

            GAuth.checkAuth().then(function () {
                deferred.resolve(true);
            }, function () {
                deferred.resolve($state.target("login"));
            });

            return deferred.promise;
        });
    }
})();