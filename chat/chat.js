angular.module( 'owen.chat', [
  'auth0'
])
.controller( 'ChatCtrl', function HomeController( $scope, auth, $http, $location, store ) {
  var fb = new Firebase('https://sweltering-heat-7411.firebaseio.com/web/chat');
  var message = fb.child("messages");
  var last15messages = message.limit(15);
  var presence = fb.child("users");
  $scope.auth = auth;
  $scope.chat = {
    input: "",
    submit: function(){
      if(this.input){
        message.push({user: auth.profile.name, message: this.input, email: auth.profile.email || "No email provided.", picture: auth.picture});
        this.input = "";
      }
    },
    keyup: function(key){
      if(key === 13){
        this.submit();
      }
    }
  };
  $scope.data = {
    messages: []
  };

  last15messages.on('child_added', function(snapshot){
    var message = snapshot.val();
    $scope.data.messages.push(message);
  });

  $scope.logout = function() {
    auth.signout();
    store.remove('profile');
    store.remove('token');
    $location.path('/login');
  }
});