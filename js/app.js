// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
	.state('app', {
    url: '/app',
    //abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegisterCtrl'
  })
  .state('app.basket', {
    url: '/basket',
    views: {
      'menuContent': {
        templateUrl: 'templates/basket.html',
        controller: 'BasketCtrl'
      }
    }
  })
  .state('app.delivery', {
    url: '/delivery',
    views: {
      'menuContent': {
        templateUrl: 'templates/delivery.html',
        controller: 'DeliveryCtrl'
      }
    }
  })
  .state('app.dashboard', {
    url: '/dashboard',
    views: {
      'menuContent': {
        templateUrl: 'templates/dashboard.html',
        controller: 'DashboardCtrl'
      }
    }
  })
  .state('app.myorders', {
    url: '/myorders',
    views: {
      'menuContent': {
        templateUrl: 'templates/myorders.html',
        controller: 'MyordersCtrl'
      }
    }
  })
  .state('app.settings', {
    url: '/settings',
    views: {
      'menuContent': {
        templateUrl: 'templates/settings.html',
        controller: 'SettingsCtrl'
      }
    }
  });
  $urlRouterProvider.otherwise('/login');
})


.factory('Api', function ($q, $http) {
  return {
		get: function (endpoint) {
      var deferred = $q.defer();
      $http({
				url: 'https://www.meatod.com/wc-api/v3/' + endpoint + '/?consumer_key=ck_d8c6067441f651758d07404b671104f921ec0032&consumer_secret=cs_e6aa4d941d9b2f02c800973f6387edc505b1a15b',
				method: 'GET',
				withCredentials: false
			}).then(function(response) {
				deferred.resolve(response);
			});
			return deferred.promise;
    }
  }

});
