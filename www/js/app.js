// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers_comfort.js
angular.module('starter', ['ionic' ,'starter.controllers', 'ionic-toast'])

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
    abstract: true,
    templateUrl: 'templates/menu.html'
    //resolve:{ 'settingData' : function(settingHP){return settingHP.promise;} }
  })
  .state('app.help', {
    url: '/help',
    views: {
      'menuContent': {
        templateUrl: 'templates/help.html'
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
  })
  .state('app.comfortlist', {
    url: '/comfortlist',
    views: {
      'menuContent': {
        templateUrl: 'templates/comfortlist.html',
        controller: 'ComfortCtrl'
      }
    }
  })
  .state('app.statuslist', {
    url: '/statuslist',
      views: {
        'menuContent': {
          templateUrl: 'templates/statuslist.html',
          controller: 'StatusCtrl'
          }
      }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/comfortlist');
});


var _service = angular.module('starter.services', []);

var _control = angular.module('starter.controllers', ['starter.services']);
