angular.module('calendarApp').run(['$templateCache', function($templateCache) {$templateCache.put('calendar/calendar.tmpl.html','<div layout="column" flex>\r\n\t<!--<md-list>\r\n\t\t<md-list-item ng-repeat="calendar in vm.calendars">\r\n\t\t\t{{ calendar.summary }}\r\n\t\t</md-list-item>\r\n\t</md-list>-->\r\n    \r\n\t<md-button class="md-raised" ng-click="vm.saveShifts()">Save</md-button>\r\n    <md-grid-list md-cols="1" md-cols-gt-xs="7" md-row-height="3:2" md-row-height-gt-xs="3:10" md-row-height-gt-sm="4:8" md-row-height-gt-md="4:4" flex>\r\n        <md-grid-tile ng-if="!vm.smallScreen" ng-repeat="offset in ::vm.getRange(vm.offsetDays) track by $index">\r\n            <md-grid-tile-header>\r\n            </md-grid-tile-header>\r\n        </md-grid-tile>\r\n        <md-grid-tile ng-repeat="day in vm.days" class="calendar-grid">\r\n\t\t\t<div layout="column" flex layout-fill>\r\n\t\t\t\t<md-grid-tile-header>\r\n\t\t\t\t\t<h3 class="calendar-header">{{ ::day.date | date: dd-MM-YYYY }}</h3>\r\n\t\t\t\t</md-grid-tile-header>\r\n\t\t\t\t<div layout="row" layout-wrap class="calendar-content">\r\n\t\t\t\t\t<div flex="20" flex-gt-xs="50" flex-gt-md="25" ng-repeat="(shift, times) in vm.shifts">\r\n\t\t\t\t\t\t<md-button ng-click="vm.setShift(day, shift)" class="md-raised md-primary shift-button" ng-class="{ \'active\': day.shift === shift }">\r\n\t\t\t\t\t\t\t<md-tooltip>\r\n                                {{ ::times | duration }}\r\n\t\t\t\t\t\t\t</md-tooltip>\r\n\t\t\t\t\t\t\t{{ ::shift }}\r\n\t\t\t\t\t\t</md-button>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n            </div>\r\n        </md-grid-tile>\r\n    </md-grid-list>\r\n\r\n</div>');
$templateCache.put('login/login.tmpl.html','<md-card flex>\r\n    <md-card-title>\r\n        <md-card-title-text>\r\n            <h1 class="md-headline">Login</h1>\r\n        </md-card-title-text>\r\n    </md-card-title>\r\n    <md-card-actions>\r\n        <md-button class="md-raised" ng-click="vm.doLogin()">Login</md-button>\r\n    </md-card-actions>\r\n</md-card>');
$templateCache.put('top-toolbar/top-toolbar.tmpl.html','<md-toolbar>\r\n    <div class="md-toolbar-tools">\r\n\t\t<h2>\r\n\t\t\t<span><a ui-sref="calendar">Shift planner</a></span>\r\n\t\t</h2>\r\n        <span flex></span>\r\n\t\t<md-button ng-if="!vm.isLoggedIn()" aria-label="login" ng-click="vm.goToLogin()">Login</md-button>\r\n\t\t<span ng-if="vm.isLoggedIn()">Welcome back {{ vm.getUser().given_name }}!</span>\r\n    </div>\r\n</md-toolbar>');}]);