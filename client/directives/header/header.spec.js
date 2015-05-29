'use strict';

describe('Directive: header', function () {

  beforeEach(module('121assignment3website', 'templates'));

  var element, scope;

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = angular.element('<header></header>');
    element = $compile(element)(scope);
    scope.$apply();
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });
});
