'use strict';

angular.module('ibelemApp').config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '^/home',
      templateUrl: 'modules/home/homeTemplate.html',
      controller: 'homeController'
    })
    .state('about', {
      url: '^/about',
      templateUrl: 'modules/about/aboutTemplate.html',
      controller: 'aboutController'
    })
    .state('contact', {
      url: '^/contact',
      templateUrl: 'modules/contact/contactTemplate.html',
      controller: 'contactController'
    });
});