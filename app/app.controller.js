'use strict';

angular.module('ibelemApp').controller('mainController', function ($scope, $rootScope) {
  $rootScope.currentState = 'Initialisation';
  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    $rootScope.currentState = toState;
  });
});