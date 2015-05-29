'use strict';

angular.module('121assignment3website', [
  'ngRoute',
  'ngAnimate',
  'angular-loading-bar'
])
  .config(function ($routeProvider, $locationProvider) {

    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);

  });
