'use strict';

angular.
    module('calendar').
    component('calendar', {
        templateUrl: 'calendar/calendar.tmpl.html',
        controller: calendarController,
        controllerAs: 'vm',
		bindings: {
			flex: '='
		}
    });

function calendarController($mdMedia, $scope, GApi, calendarService) {
    var vm = this;

    vm.$onInit = onInit;
	vm.saveShifts = saveShifts;

    function onInit() {
        GApi.executeAuth('calendar', 'calendarList.list').then(function (resp) {
            vm.calendars = resp.items;
        }, function (error) {
            console.log(error);
			});

		calendarService.getShifts().then(function (shifts) {
			vm.shifts = shifts;
		});
    }

	function saveShifts() {
		GApi.executeAuth('calendar', 'events.insert', {
			calendarId: "hj3i0ucmkenfjmdbrr85v7o2q8@group.calendar.google.com",
			start: {
				"dateTime": new Date()
			},
			end: {
				"dateTime": new Date(new Date().setHours("15"))
			}
		}).then(function (resp) {
			console.log(resp);
		}, function (error) {
			console.log(error);
		});
	}

    vm.days = getDaysInMonth(new Date().getMonth() - 1, new Date().getFullYear());

	vm.smallScreen = $mdMedia('xs');

	$scope.$watch(function () {
		return $mdMedia('xs');
	}, function (small) {
		vm.smallScreen = small;
	});

    vm.setShift = function (day, shift) {
        console.log(day, shift);
        day.shift === shift ? day.shift = null : day.shift = shift;
    }

    function getDaysInMonth(month, year) {
        var date = new Date(year, month, 1);
        var days = [];

        var offsetDays = (date.getDay() || 7) - 1;

        // Add offset days to the days array, this ensures the 1st day of the month is placed at the correct position in the calendar view
        for (var i = 0; i < offsetDays; i++) {
            days.push({
                offset: true
            });
        }

        while (date.getMonth() === month) {
            days.push({
                date: new Date(date.toString())
            });
            date.setDate(date.getDate() + 1);
        }
        return days;
    }
}