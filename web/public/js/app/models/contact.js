app.service('Contact', function($resource) {
  return $resource("/api/contacts/:id");
});
