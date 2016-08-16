(function () {
    "use strict";

    angular
        .module("calendarApp", [
            "ngMaterial",
            "calendar",
            "login",
            "topToolbar",
			"footer",
            "ui.router",
            "angular-google-gapi",
            "angulartics",
            "angulartics.google.analytics",
            "angularMoment"
        ]);
})();