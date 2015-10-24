var app =
  angular
  .module('quickinfo', ['ngResource', 'ngSanitize', 'ngRoute', 'ngCookies'])
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'partials/feeditems.html',
          controller: 'FeedItemsController'
        })
        .when('/contacts', {
          templateUrl: 'partials/contacts.html',
          controller: 'ContactsController'
        })
        .when('/contacts/:contactId', {
          templateUrl: 'partials/contact.html',
          controller: 'ContactController'
        })
        .when('/login', {
          templateUrl: 'partials/login.html',
          controller: 'LoginController'
        })
        .otherwise({
          redirectTo: '/'
        });
    }
  ])
  .run(['$rootScope', '$injector',
    function($rootScope, $injector) {
      // Get token from cookie if present - and set it in the header
      // of all subsequent calls
      var $cookies = $injector.get("$cookies");
      var token = $cookies.get('token');
      if (token) {
        var $http = $injector.get("$http");
        $http.defaults.headers.common.Authorization = "Bearer " + token;
      }
    }
  ]);
