(function () {
    "use strict";

    angular
        .module("error")
        .controller("errorDialogController", errorDialogController);

    function errorDialogController($mdDialog, error) {
        var vm = this;

		vm.close = close;
		vm.error = error;

        function close() {
			$mdDialog.hide();
		}
    }
})();