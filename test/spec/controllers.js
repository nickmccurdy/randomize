'use strict';

describe('Module: randomize.controllers', function () {
  beforeEach(module('randomize.controllers'));

  describe('Controller: PreloaderController', function () {
    var $scope;

    beforeEach(inject(function ($controller, $rootScope) {
      $scope = $rootScope.$new();
      $controller('PreloaderController', { $scope: $scope });
    }));

    describe('$scope.coinImages', function () {
      it('is a list of 2 images', function () {
        expect($scope.coinImages().length).toBe(2);
      });
    });

    describe('$scope.dieImages', function () {
      it('is a list of 6 images', function () {
        expect($scope.dieImages().length).toBe(6);
      });
    });

    describe('$scope.cardImages', function () {
      it('is a list of 54 images', function () {
        expect($scope.cardImages().length).toBe(54);
      });
    });

    describe('$scope.images', function () {
      it('is a list of 62 images', function () {
        expect($scope.images.length).toBe(62);
      });
    });
  });
});
