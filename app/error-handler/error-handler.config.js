(function () {
	"use strict";

	angular
		.module("error")
		.config(errorConfig);

	function errorConfig($provide) {
		$provide.decorator("$exceptionHandler", function ($delegate, $injector) {
			if (!('toJSON' in Error.prototype)) {
				Object.defineProperty(Error.prototype, 'toJSON', {
					value: function () {
						var alt = {};

						Object.getOwnPropertyNames(this).forEach(function (key) {
							alt[key] = this[key];
						}, this);

						return alt;
					},
					configurable: true,
					writable: true
				});
			}

			return function (exception, cause) {
				var errorService = $injector.get("errorService");
				console.log("got exception: ", exception, cause);
				var json = JSON.parse(JSON.stringify(exception));
				errorService.addToast(json);
				$delegate(exception, cause);
			};
		});
	}
})();