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

function calendarController($mdMedia, $scope, GApi, calendarService, $window, calendarId) {
    var vm = this;

    vm.$onInit = onInit;
	vm.saveShifts = saveShifts;

    function onInit() {
        var today = new Date();
        vm.offsetDays = getOffsetDays(today.getMonth() - 1, today.getUTCFullYear());
        vm.days = getDaysInMonth(today.getMonth() - 1, today.getUTCFullYear());
        
        //TODO: Load event from current month

        GApi.executeAuth('calendar', 'events.list', {
            calendarId: calendarId,
            //timeMin: new Date(new Date().setDate(1))
        }).then(function (resp) {
            console.log(resp);
            vm.calendars = resp.items;
        }, function (error) {
            console.log(error);
			});

		calendarService.getShifts().then(function (shifts) {
			vm.shifts = shifts;
		});
    }

    vm.getRange = function (num) {
        return new Array(num);
    }

    function createTime(date, time) {
        var dateObject = new Date(date);
        dateObject.setHours(time.hour);
        dateObject.setMinutes(time.minute);

        return { "dateTime": dateObject };
    }

    var actions = {
        'insert': 'events.insert',
        'delete': 'events.delete',
        'update': 'events.patch'
    }

    function createRequest(element) {
        var action;
        var params = {
            calendarId: calendarId,
        }

        //TODO: Patch and delete functions, load data from google first

        if (element.shift) {
            action = 'insert'; 
            params.start = createTime(element.date, vm.shifts[element.shift].start);
            params.end = createTime(element.date, vm.shifts[element.shift].end);
            params.summary = element.shift;
        }

        var req = action ? GApi.createRequest('calendar', actions[action], params) : undefined;

        return req; 
    }

    function saveShifts() {
        var batch = $window.gapi.client.newBatch();

        vm.days.forEach(function (element) {
            var possibleRequest = createRequest(element);

            if (possibleRequest) {
                batch.add(possibleRequest);
            }
        }, this);

        console.log(batch);
        
        batch.then(function (ok) {
            console.log(ok);
        }, function (error) {
            console.log(error);
        }, this);
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