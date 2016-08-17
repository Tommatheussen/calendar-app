(function () {
	"use strict";

	angular
		.module("error")
		.config(errorConfig);

	function errorConfig($provide) {
		$provide.decorator("$exceptionHandler", function ($delegate, $injector) {
			return function (exception, cause) {
				var errorService = $injector.get("errorService");
				console.log("got exception: ", exception, cause);
				errorService.addToast(exception);
				$delegate(exception, cause);
			};
		});
	}
})();