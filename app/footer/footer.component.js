(function () {
    "use strict";

    angular
        .module("footer")
        .component("footer", {
            templateUrl: "footer/footer.tmpl.html",
            controller: footerController,
            controllerAs: "vm"
        });

    function footerController(GAuth, GData, $state) {
        var vm = this;
    }
})();