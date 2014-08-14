'use strict';

describe('Module: randomize.tools', function () {
  beforeEach(module('randomize.tools'));

  describe('Value: cards', function () {
    var cards;

    beforeEach(inject(function (_cards_) {
      cards = _cards_;
    }));

    it('returns 54 cards', function () {
      expect(cards.length).toBe(54);
    });

    it('returns valid cards with "file" and "alt" fields', function () {
      expect(cards.every(function (card) {
        return card.file && card.alt;
      })).toBe(true);
    });
  });

  describe('Controller: DiceController', function () {
    var $scope;

    beforeEach(inject(function ($controller, $rootScope) {
      $scope = $rootScope.$new();
      $controller('DiceController', { $scope: $scope });
    }));

    it('should attach a number from 1 to 6 to the scope', function () {
      expect($scope.result).toBeGreaterThan(0);
      expect($scope.result).toBeLessThan(7);
    });
  });

  describe('Controller: CoinsController', function () {
    var $scope;

    beforeEach(inject(function ($controller, $rootScope) {
      $scope = $rootScope.$new();
      $controller('CoinsController', { $scope: $scope });
    }));

    it('should attach heads or tails to the scope', function () {
      expect($scope.result).toMatch(/heads|tails/);
    });
  });

  describe('Controller: CardsController', function () {
    var $scope;

    beforeEach(inject(function ($controller, $rootScope) {
      $scope = $rootScope.$new();
      $controller('CardsController', { $scope: $scope });
    }));

    it('should attach a card to the scope', function () {
      expect($scope.result.file).toBeDefined();
      expect($scope.result.alt).toBeDefined();
    });
  });

  describe('Controller: NumbersController', function () {
    var $scope;

    beforeEach(inject(function ($controller, $rootScope) {
      $scope = $rootScope.$new();
      $scope.minimum = 1;
      $scope.maximum = 10;
      $controller('NumbersController', { $scope: $scope });
    }));

    it('should attach a number from 1 to 10 to the scope', function () {
      expect($scope.result).toBeGreaterThan(0);
      expect($scope.result).toBeLessThan(11);
    });
  });

  describe('Controller: FromListController', function () {
    var $scope;

    beforeEach(inject(function ($controller, $rootScope) {
      $scope = $rootScope.$new();
      $scope.items = ['one', 'two', 'three'];
      $controller('FromListController', { $scope: $scope });
    }));

    it('should attach an item to the scope', function () {
      expect($scope.result).toMatch(/one|two|three/);
    });
  });

  describe('Controller: SortListController', function () {
    var $scope;

    beforeEach(inject(function ($controller, $rootScope) {
      $scope = $rootScope.$new();
      $scope.items = ['one', 'two', 'three'];
      $controller('SortListController', { $scope: $scope });
    }));

    it('should attach 5 items to the scope', function () {
      expect($scope.result.sort()).toEqual($scope.items.sort());
    });
  });
});
