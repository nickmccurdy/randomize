'use strict';

var app = angular.module('randomize', [
  'ngRoute',
  'randomize.controllers',
  'randomize.tools'
]);

app.config(function ($routeProvider) {
  $routeProvider.when('/dice',     { templateUrl: 'views/dice.html',      controller: 'DiceController' });
  $routeProvider.when('/coins',    { templateUrl: 'views/coins.html',     controller: 'CoinsController' });
  $routeProvider.when('/cards',    { templateUrl: 'views/cards.html',     controller: 'CardsController' });
  $routeProvider.when('/numbers',  { templateUrl: 'views/numbers.html',   controller: 'NumbersController' });
  $routeProvider.when('/fromList', { templateUrl: 'views/from_list.html', controller: 'FromListController' });
  $routeProvider.when('/sortList', { templateUrl: 'views/sort_list.html', controller: 'SortListController' });
  $routeProvider.otherwise({ redirectTo: '/dice' });
});
