(function () {
    "use strict";

    angular
        .module("footer")
        .component("footer", {
            templateUrl: "footer/footer.tmpl.html",
            controller: footerController,
            controllerAs: "vm"
        });

    function footerController($rootScope) {
        var vm = this;

        vm.openHelp = openHelp;
        $rootScope.$on('help:closed', function () {
            $rootScope.showHelp = false;
        });

        function openHelp() {
            $rootScope.showHelp = true;
        }
    }
})();