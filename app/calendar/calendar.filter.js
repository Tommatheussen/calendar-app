(function () {
    "use strict";

    angular
        .module("calendar")
        .filter("duration", function () {
            return function (input) {
                var duration = input.start.hour;
                duration += ":";
                duration += input.start.minute;
                duration += "-";
                duration += input.end.hour;
                duration += ":";
                duration += input.end.minute;
                return duration;
            };
        });
})();