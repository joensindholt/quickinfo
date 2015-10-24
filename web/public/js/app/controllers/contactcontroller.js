app.controller('ContactController', ['$scope', '$routeParams', 'Contact',
  function($scope, $routeParams, Contact) {
    // Query for contact data
    Contact.get({id: $routeParams.contactId}, function(data) {
      $scope.contact = data;
    });
  }
]);
