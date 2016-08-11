'use strict';

angular.module('calendar')
	.factory('calendarService', function ($http) {
        return {
            getShifts: getShifts
        };

		function getShifts() {
			return $http.get('shifts.json')
				.then(getShiftsComplete)
				.catch(errorHandling);

			function getShiftsComplete(response) {
				console.log(response);
				return response.data;
			}
		}

		function errorHandling(error) {
			console.log(error);
		}

	});