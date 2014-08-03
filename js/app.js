'use strict';

var app = angular.module('randomize', [
  'ngRoute',
  'randomize.controllers',
  'randomize.tools'
]);

app.config(function ($routeProvider) {
  $routeProvider.when('/dice',     { templateUrl: 'partials/dice.html',      controller: 'DiceController' });
  $routeProvider.when('/coins',    { templateUrl: 'partials/coins.html',     controller: 'CoinsController' });
  $routeProvider.when('/cards',    { templateUrl: 'partials/cards.html',     controller: 'CardsController' });
  $routeProvider.when('/numbers',  { templateUrl: 'partials/numbers.html',   controller: 'NumbersController' });
  $routeProvider.when('/fromList', { templateUrl: 'partials/from_list.html', controller: 'FromListController' });
  $routeProvider.when('/sortList', { templateUrl: 'partials/sort_list.html', controller: 'SortListController' });
  $routeProvider.otherwise({ redirectTo: '/dice' });
});
