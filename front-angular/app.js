var app = angular.module('pt_management', ['ngRoute']);

app.config(function($routeProvider,$locationProvider) {
    $routeProvider.when('/',{
        templateUrl:'./html_components/login.html',
        controller:'loginController',
        title:'Login | SignUp',
    })
})

app.controller('loginController', function($scope,$routeProvider,$location) {
    console.warn('login page called')
})