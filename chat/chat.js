angular.module( 'owen.chat', [
  'auth0'
])
.controller( 'ChatCtrl', function HomeController( $scope, auth, $http, $location, store ) {
  var fb = new Firebase('https://sweltering-heat-7411.firebaseio.com/web/chat');
  var message = fb.child("messages");
  $scope.auth = auth;
  $scope.chat = {
    input: "",
    submit: function(){
      message.push({user: auth.profile.name, message: this.input, email: auth.profile.email || "No email provided."});
      this.input = "";
    }
  };
  $scope.data = {
    messages: []
  };

  
  message.on('child_added', function(snapshot){
    var message = snapshot.val();
    $scope.data.messages.push(message.user + ': ' + message.message)
  });

  $scope.logout = function() {
    auth.signout();
    store.remove('profile');
    store.remove('token');
    $location.path('/login');
  }
});