"use strict";

angular.module("calendar")
	.factory("calendarService", function ($http) {
        return {
            getShifts: getShifts,
			getCalendar: getCalendar
        };

		function getShifts() {
			return $http.get("shifts.json")
				.then(getShiftsComplete)
				.catch(errorHandling);

			function getShiftsComplete(response) {
				return response.data;
			}
		}

		function getCalendar() {

		}

		function errorHandling(error) {
			console.log(error);
		}

	});