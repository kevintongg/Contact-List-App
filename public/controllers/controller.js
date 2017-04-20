const myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', [
  '$scope',
  '$http',
  function ($scope, $http) {
    $http.get('/contactlist/').then((response) => {
      $scope.contactlist = response.data;
    });

    function refresh() {
      console.log('Message from controller');
      $http.get('/contactlist/').then((response) => {
        $scope.contactList = response.data;
      });
      window.location.reload();
    }

    $scope.addContact = function () {
      console.log($scope.contact);
      $http.post('/contactlist/', $scope.contact).then((response) => {
        console.log(response);
        refresh();
      });
    };

    $scope.remove = function (id) {
      console.log(id);
      $http.delete('/contactlist/' + id).then(() => {
        refresh();
      });
    };

    $scope.update = function () {
      console.log($scope.contact._id);
      $http
        .put('/contactlist/' + $scope.contact._id, $scope.contact)
        .then((response) => {
          refresh();
        });
    };

    $scope.clear = function () {
      $scope.contact = '';
    };

    $scope.edit = function (id) {
      console.log(`ID: ${id}`);
      $http.get('/contactlist/' + id).then((response) => {
        $scope.contact = response.data;
      });
    };
  },
]);
