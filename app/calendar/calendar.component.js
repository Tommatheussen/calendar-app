'use strict';

angular.
    module('calendar').
    component('calendar', {
        templateUrl: 'calendar/calendar.template.html',
        controller: calendarController,
        controllerAs: 'vm'
    });

function calendarController() {
    var vm = this;

    vm.days = getDaysInMonth(new Date().getMonth() - 1, new Date().getFullYear());

    vm.shifts = [
        'v\'',
        'kv',
        'h1',
        'Gv',
        'klv',
        'l\'',
        'gl',
        'hmlw',
        'vw',
        'ld',
        'dw',
    ];

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