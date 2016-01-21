'use strict';

angular.module('commonModule', []);
angular.module('homeModule', ['commonModule']);
angular.module('aboutModule', ['commonModule']);
angular.module('contactModule', ['commonModule']);

var ibelemApp = angular.module('ibelemApp', [
  'ngAnimate',
  'ngAria',
  'ngCookies',
  'ngMessages',
  'ngResource',
  'ui.router',
  'homeModule',
  'aboutModule',
  'contactModule'
]);


