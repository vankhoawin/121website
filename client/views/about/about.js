'use strict';

angular.module('121assignment3website')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/about', {
        templateUrl: 'views/about/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'vm'
      });
  });
