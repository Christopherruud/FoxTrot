'use strict';
//Her kan vi lage tilhørlighet mellom partials og knapper f.eks
// Declare app level module which depends on filters, and services
angular.module('quizApp', [
  'ngRoute',
  'quizApp.filters',
  'quizApp.services',
  'quizApp.directives',
  'quizApp.controllers',
  'ngResource',
  'leaflet-directive'
]).
config(['$routeProvider', function($routeProvider , RestangularProvider) {
//  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
//  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
//  $routeProvider.when('/view3', {templateUrl: 'partials/partial3.html', controller: 'MyCtrl3'});
  $routeProvider.when('/viewCourseedit', {templateUrl: 'partials/courseedit.html', controller: 'MyCtrl4'});
  $routeProvider.when('/viewModuleedit', {templateUrl: 'partials/moduleedit.html', controller: 'MyCtrl5'});
  $routeProvider.when('/viewQuizedit', {templateUrl: 'partials/quizedit.html', controller: 'MyCtrl6'});
  $routeProvider.otherwise({redirectTo: '/viewCourseedit'});
}]);
