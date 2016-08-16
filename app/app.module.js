(function () {
    "use strict";

    angular
        .module("calendarApp", [
            "ngMaterial",
            "calendar",
            "login",
            "topToolbar",
			"footer",
			'error',
            "ui.router",
            "angular-google-gapi",
            "angulartics",
            "angulartics.google.analytics",
            "angularMoment",
            "angularHelpOverlay"
        ]);
})();