(function () {
    "use strict";

    angular
        .module("calendar")
        .component("calendar", {
            templateUrl: "calendar/calendar.tmpl.html",
            controller: calendarController,
            controllerAs: "vm",
            bindings: {
                flex: "="
            }
        });

    function calendarController($mdMedia, $scope, GApi, calendarService, $window, calendarId, $filter, $mdDialog) {
        var vm = this;

        vm.$onInit = onInit;
        vm.saveShifts = saveShifts;
        vm.getRange = getRange;
		vm.prevMonth = prevMonth;
		vm.nextMonth = nextMonth;
		vm.today = new Date();
        vm.currentDate = new Date();

		function prevMonth() {
			vm.currentDate.setMonth(vm.currentDate.getMonth() - 1, 1);
			monthUpdated();
		}

		function nextMonth() {
			vm.currentDate.setMonth(vm.currentDate.getMonth() + 1, 1);
			monthUpdated();
		}

        var previousEvents = {};
        var actions = {
            "insert": "events.insert",
            "delete": "events.delete",
            "update": "events.patch"
        };

        function onInit() {
        	calendarService.getShifts().then(function (shifts) {
                vm.shifts = shifts;
            });

			monthUpdated();
        }

		function monthUpdated() {
			vm.offsetDays = getOffsetDays(vm.currentDate.getMonth(), vm.currentDate.getUTCFullYear());
            vm.days = getDaysInMonth(vm.currentDate.getMonth(), vm.currentDate.getUTCFullYear());

            var timeMin = new Date(vm.currentDate.getFullYear(), vm.currentDate.getMonth(), 1).toISOString();
            var timeMax = new Date(vm.currentDate.getFullYear(), vm.currentDate.getMonth() + 1, 1)
                .toISOString();

			calendarService.getPreviousEvents(timeMin, timeMax).then(function (events) {
                previousEvents = events;

                setPreviousShifts();
            });
		}

        function setPreviousShifts() {
            vm.days.map(function (day) {
                var formattedDate = $filter("amDateFormat")(day.date, "DD-MM-YYYY");
                day.shift = previousEvents[formattedDate] ? previousEvents[formattedDate].shift : null;
            });
        }

        function getRange(num) {
            return new Array(num);
        }

        function createTime(date, time) {
            var dateObject = new Date(date);
            dateObject.setHours(time.hour);
            dateObject.setMinutes(time.minute);

            return { "dateTime": dateObject };
        }

        function createRequest(element) {
            var action;
            var params = {
                calendarId,
            };

            var formattedDate = $filter("amDateFormat")(element.date, "DD-MM-YYYY");

            if (element.shift && !previousEvents[formattedDate]) {
                action = "insert";
                params.start = createTime(element.date, vm.shifts[element.shift].start);
                params.end = createTime(element.date, vm.shifts[element.shift].end);
                params.summary = element.shift;
            } else if (element.shift && previousEvents[formattedDate] && previousEvents[formattedDate].shift !== element.shift) {
                action = "update";
                params.eventId = previousEvents[formattedDate].id;
                params.start = createTime(element.date, vm.shifts[element.shift].start);
                params.end = createTime(element.date, vm.shifts[element.shift].end);
                params.summary = element.shift;
            } else if (!element.shift && previousEvents[formattedDate]) {
                action = "delete";
                params.eventId = previousEvents[formattedDate].id;
            }

            var req = action ? GApi.createRequest("calendar", actions[action], params) : null;

            return req;
        }

        function saveShifts() {
            var allRequests = [];

            $rootScope.showHelp = true;            
            /*vm.days.forEach(function (element) {
                var possibleRequest = createRequest(element);

                if (possibleRequest) {
                    allRequests.push(possibleRequest);
                }
            }, this);

            if (allRequests.length > 0) {
                var batch = $window.gapi.client.newBatch();

                for (var i = 0; i < allRequests.length; i++) {
                    batch.add(allRequests[i]);
                }

                batch.then(function (ok) {
                    vm.days.forEach(function (day) {
                        var formattedDate = $filter("amDateFormat")(day.date, "DD-MM-YYYY");

                        previousEvents[formattedDate] = day.shift;
                    }, this);

                    var dialog = $mdDialog.alert()
                        .title('Update success')
                        .textContent('De shiften zijn succesvol opgeslagen in Google Calendar.')
                        .ok('Super!');

                    $mdDialog.show(dialog);
                }, function (error) {
                    console.log(error);
                }, this);
            }*/
        }

/*        vm.smallScreen = $mdMedia("xs");

        $scope.$watch(function () {
            return $mdMedia("xs");
        }, function (small) {
            vm.smallScreen = small;
        });*/

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
})();