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
        var today = new Date();
        vm.offsetDays = getOffsetDays(today.getMonth() - 1, today.getUTCFullYear());
        vm.days = getDaysInMonth(today.getMonth() -1, today.getUTCFullYear());

        /*GApi.executeAuth('calendar', 'calendarList.list').then(function (resp) {
            vm.calendars = resp.items;
        }, function (error) {
            console.log(error);
			});
*/
		calendarService.getShifts().then(function (shifts) {
			vm.shifts = shifts;
		});
    }

    vm.getRange = function (num) {
        console.log(num);
        return new Array(num);
    }

    function saveShifts() {
        console.log(vm.days);

        
        
        
		/*GApi.executeAuth('calendar', 'events.insert', [{
			calendarId: "hj3i0ucmkenfjmdbrr85v7o2q8@group.calendar.google.com",
			start: {
				"dateTime": new Date()
			},
			end: {
				"dateTime": new Date(new Date().setHours("17"))
            }
        }, {
            calendarId: "hj3i0ucmkenfjmdbrr85v7o2q8@group.calendar.google.com",
			start: {
				"dateTime": new Date(new Date().setHours("21"))
			},
			end: {
				"dateTime": new Date(new Date().setHours("22"))
            }    
        }]).then(function (resp) {
			console.log(resp);
		}, function (error) {
			console.log(error);
		});*/
	}

	vm.smallScreen = $mdMedia('xs');

	$scope.$watch(function () {
		return $mdMedia('xs');
	}, function (small) {
		vm.smallScreen = small;
	});

    vm.setShift = function (day, shift) {
        day.shift === shift ? day.shift = null : day.shift = shift;
    }

    function getDaysInMonth(month, year) {
        var date = new Date(year, month, 1);
        var days = [];

        while (date.getMonth() === month) {
            days.push({
                date: new Date(date.toString())
            });
            date.setDate(date.getDate() + 1);
        }
        return days;
    }

    function getOffsetDays(month, year) {
        var date = new Date(year, month, 1);

        var offsetDays = (date.getDay() || 7) - 1;
        return offsetDays;
    }
}