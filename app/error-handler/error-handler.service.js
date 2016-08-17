(function () {
	"use strict";

	angular
		.module("error")
		.factory("errorService", errorService);

	function errorService($mdDialog, $mdToast) {
		let toast = $mdToast.simple()
			.textContent("Oops, that's not quite right...")
			.action("Details")
			.highlightAction(true)
			.position("bottom right")
			.hideDelay(5000);

		let dialog = {
			templateUrl: "error-handler/error-dialog.tmpl.html",
			controllerAs: 'vm',
			controller: "errorDialogController"
		}

		var toastQueue = [];
		var isOpen = false;

		return {
			addToast,
			openToast,
			openDialog
		}

		function addToast(error) {
			toastQueue.push(error);
			if (!isOpen) {
				openToast();
			}
		}

		function openToast() {
			isOpen = true;
			var error = toastQueue.shift();

			$mdToast.show(toast).then(function (response) {
				if (response === "ok") {
					openDialog(error);
				}

				if (toastQueue.length === 0) {
					isOpen = false;
				} else {
					openToast();
				}
			});
		}

		function openDialog(error) {
			dialog.locals = {
				error: error
			};

			$mdDialog.show(dialog);
		}
	}
})();