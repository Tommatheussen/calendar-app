(function () {
    "use strict";

    angular
        .module("calendar")
        .factory("calendarService", function ($http, GApi, calendarId, $filter) {
            return {
                getShifts,
                getPreviousEvents
            };

            function getShifts() {
                return $http.get("shifts.json")
                    .then(getShiftsComplete)
                    .catch(errorHandling);

                function getShiftsComplete(response) {
                    return response.data;
                }
            }

            function getPreviousEvents(timeMin, timeMax) {
                return GApi.executeAuth("calendar", "events.list", {
                    calendarId: calendarId,
                    fields: [
                        "items/start, items/summary, items/id"
                    ],
                    timeMin,
                    timeMax
                })
                    .then(getPreviousEventsComplete)
                    .catch(errorHandling);
            
                function getPreviousEventsComplete(response) {
                    var events = {};
                    response.items.map(function (event) {
                        var formattedDate = $filter("amDateFormat")(event.start.dateTime, "DD-MM-YYYY");
                        events[formattedDate] = {
                            shift: event.summary,
                            id: event.id
                        };
                    });

                    return events;
                }
            }

            function errorHandling(error) {
                console.log(error);
            }

        });
})();