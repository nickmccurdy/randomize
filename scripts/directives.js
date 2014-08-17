'use strict';

var app = angular.module('randomize.directives', []);

app.directive('randTab', function () {
  return {
    replace: true,
    scope: {
      heading: '@',
      href: '@',
      icon: '@'
    },
    templateUrl: 'partials/rand_tab.html'
  };
});
