angular.module( 'owen.chat', [
  'auth0'
])
.controller( 'ChatCtrl', function HomeController( $scope, auth, $http, $location, store ) {
  var fb = new Firebase('https://sweltering-heat-7411.firebaseio.com/web/chat');
  var messages = fb.child("messages");
  var presence = fb.child("users");
  $scope.auth = auth;
  $scope.chat = {
    input: "",
    submit: function(){
      if(this.input){
        message.push({
          user: auth.profile.name, 
          message: this.input, 
          email: auth.profile.email || "No email provided.", 
          picture: auth.profile.picture || 0
        });
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

  messages.limitToLast(15).on('child_added', function(snapshot){
    var message = snapshot.val();
    $scope.data.messages.push(message);
  });
});