app.controller('LoginController', ['$scope', '$rootScope', '$routeParams', '$http', '$location', '$cookies',
  function($scope, $rootScope, $routeParams, $http, $location, $cookies, Contact) {
    $scope.login = function(user) {
      console.log('logging in');
      $http({
        method: 'POST',
        url: '/api/login',
        data: {
          username: user.username,
          password: user.password
        }
      }).then(function success(response) {
        // Set token cookie
        $cookies.put('token', response.data.token);
        // Set global auth header - this will be used in all subsequent calls
        $rootScope.token = response.data.token;
        // $http.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
        // Redirect to front page
        $location.path('/');

      }, function error(response) {
        console.error('An error occured trying to get token:');
        console.error(response);
      });
    }
  }
]);
