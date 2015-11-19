'use strict';

var DEPDEPHOST = "http://deep-api.ipedrazas.k8s.co.uk:5000"
var REPORT_API = "http://deep-reports.ipedrazas.k8s.co.uk:5000"
// var DEPDEPHOST = "http://localhost:5000"

var app = angular.module('dsp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/dashboard', {
        templateUrl: '/pages/dashboard.html',
        controller: 'MainCtrl'
      })
      .when('/blueprints', {
        templateUrl: '/pages/blueprints.html',
        controller: 'MainCtrl'
      })
      .when('/builds', {
        templateUrl: '/pages/builds.html',
        controller: 'MainCtrl'
      })
      .when('/deploys', {
        templateUrl: '/pages/deploys.html',
        controller: 'MainCtrl'
      })
       .when('/', {
        templateUrl: '/pages/dashboard.html',
        controller: 'MainCtrl'
      })
      ;

    $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
        });
}]);

app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);
