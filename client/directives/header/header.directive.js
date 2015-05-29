'use strict';

angular.module('121assignment3website')
  .directive('header', function () {
    return {
      restrict: 'E',
      templateUrl: 'directives/header/header.html'
    };
  });
