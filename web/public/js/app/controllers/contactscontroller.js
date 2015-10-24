app.controller('ContactsController', ['$scope', '$location', 'Contact',
  function($scope, $location, Contact) {
    // Query for contacts
    Contact.query(function(data) {
      $scope.contacts = data;
    });

    $scope.handleContactClicked = function(contact) {
      $location.path('contacts/' + contact.id);
    };
  }
]);
