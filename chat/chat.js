angular.module( 'owen.chat', [
  'auth0'
])
.controller( 'ChatCtrl', function HomeController( $scope, auth, $http, $location, store ) {
  $scope.auth = auth;
  


  
  $scope.logout = function() {
    auth.signout();
    store.remove('profile');
    store.remove('token');
    $location.path('/login');
  }
});