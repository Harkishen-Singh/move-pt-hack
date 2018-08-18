var app = angular.module('pt_management', ['ngRoute']);

app.config(function($routeProvider,$locationProvider) {
    $routeProvider
    .when('/',{
        templateUrl:'./html_components/login.html',
        controller:'loginController',
        title:'Login | SignUp',
    })
    .when('/dashboard', {
        templateUrl:'./html_components/dashboard.html',
        controller:'dashController',
        title:'Dashboard',
    })
})

app.controller('loginController', function($scope,$location) {
    console.warn('login page called')
    $scope.showHeader = false;
    $scope.title = 'Login | SignUP'
    $scope.wrongpass = '';
    $scope.checkLogin =  function() {
        if($scope.password=='1') {
            console.warn('logged in')
            $scope.wrongpass = 'Success';
            $location.path('/dashboard');
        }
        else {
            $scope.wrongpass = 'Wrong Password entered'
        }
    }

    
})