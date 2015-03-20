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
      message.push({user: auth.profile.name, timestamp: new Date(), message: this.input});
    }
  };

  //Currently copied directly from Firebase tutorial
  message.on('child_added', function(snapshot){
    var message = snapshot.val();
    displayMessage(message.timestamp, message.name, message.text);
  });

  function displayMessage(time, name, text) {
        $('<div/>').text(text).prepend($('<em/>').text(time+'- '+name+': ')).appendTo($('#messages'));
        $('#messages')[0].scrollTop = $('#messages')[0].scrollHeight;
      };


  $scope.logout = function() {
    auth.signout();
    store.remove('profile');
    store.remove('token');
    $location.path('/login');
  }
});