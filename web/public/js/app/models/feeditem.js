app.service('FeedItem', function($resource) {
  return $resource("/api/feeditems/:id");
});
