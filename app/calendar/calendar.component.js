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

    function calendarController($mdMedia, $scope, GApi, calendarService, $window, calendarId, $filter) {
        var vm = this;

        vm.$onInit = onInit;
        vm.saveShifts = saveShifts;
        vm.getRange = getRange;

        var previousEvents = {};
        var actions = {
            "insert": "events.insert",
            "delete": "events.delete",
            "update": "events.patch"
        };

        //TODO: Generic error handling -> Open an infowindow 
        //TODO: Success on update

        function onInit() {
            var today = new Date();
            vm.offsetDays = getOffsetDays(today.getMonth(), today.getUTCFullYear());
            vm.days = getDaysInMonth(today.getMonth(), today.getUTCFullYear());

            var timeMin = new Date(today.getFullYear(), today.getMonth(), 1).toISOString();
            var timeMax = new Date(today.getFullYear(), today.getMonth() + 1, 0)
                .toISOString();

            calendarService.getPreviousEvents(timeMin, timeMax).then(function (events) {
                previousEvents = events;

                setPreviousShifts();
            });

            calendarService.getShifts().then(function (shifts) {
                vm.shifts = shifts;
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
            }

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

            vm.days.forEach(function (element) {
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
                    console.log(ok);

                    vm.days.forEach(function (day) {
                        var formattedDate = $filter("amDateFormat")(day.date, "DD-MM-YYYY");

                        previousEvents[formattedDate] = day.shift;
                    }, this);
                }, function (error) {
                    console.log(error);
                }, this);
            }
        }

        vm.smallScreen = $mdMedia("xs");

        $scope.$watch(function () {
            return $mdMedia("xs");
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
})();