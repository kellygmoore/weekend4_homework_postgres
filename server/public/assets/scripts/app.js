var myApp = angular.module('myApp', []);

myApp.controller("WelcomeController",['$scope', '$http', function($scope, $http){
    $scope.note = {};
    $scope.messageArray = [];

    //POST
    $scope.clickButton = function(kittyFooFoo){
        console.log(kittyFooFoo);
        $http.post('/people', kittyFooFoo).then(function(response){
            $scope.getPeople();
            console.log(response);
        });
    };

    //GET
    $scope.getPeople = function(){
        $http.get('/people').then(function(response){
            $scope.messageArray = response.data;
        });
    };

    $scope.getPeople();
}]);








//$(document).ready(function(){
//    console.log("I'm working!");
//    $("#addMessage").submit(function(event) {
//
//        event.preventDefault();
//
//        var values = {};
//
//        $.each($(this).serializeArray(), function (i, field) {
//            values[field.name] = field.value;
//        });
//
//        sendMessagesFromForm(values);
//        appendMessagesToDom(values);
//
//    })
//});
//
//function sendMessagesFromForm(values){
//    $.ajax({
//        type: "POST",
//        url: "/data",
//        data: values,
//        success: function(data){
//            console.log("Messages posted in database.");
//        }
//    })
//}
//
//function appendMessagesToDom(values){
//    $.ajax({
//        type: "GET",
//        url: "/data",
//        data: values,
//        success: function(data){
//            console.log("Talking to server on my GET.");
//            showAllMessagesOnDom(data);
//        }
//    })
//}
//
//function showAllMessagesOnDom(data) {
//    console.log("Here is data to post on DOM", data);
//    $("#postAllMsgDiv").empty();
//    // var myMessages = data.message;
//    //var myName = data.name;
//    for (i = 0; i < data.length; i++) {
//        $("#postAllMsgDiv").append("<div class='eachMsgDiv well col-md-3'><p>" + data[i].name + "</p><p>" +
//            data[i].message + "</p></div>");
//    }
//}