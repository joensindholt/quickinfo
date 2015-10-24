app.controller('FeedItemsController', ['$scope', '$sce', 'FeedItem', function($scope, $sce, FeedItem) {

  // Default values
  $scope.isFiltersShown = false;

  // Query for feed items
  FeedItem.query(function(data) {
    $scope.feedItems = data;
  });

  // Handle toggling of filters
  $scope.toggleFilters = function() {
    $scope.isFiltersShown = !$scope.isFiltersShown;
  };

}]);
