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
    .when('/schedules', {
        templateUrl:'./html_components/schedule.html',
        controller:'scheduleController',
        title:'Dashboard',
    })
    .when('/mapGeneral', {
        templateUrl:'./html_components/mapGeneral.html',
        controller:'mapGenController',
        title:'Dashboard',
    })
    .when('/signUp', {
        templateUrl:'./html_components/signUp.html',
        controller:'signUpcontroller',
        title:'Dashboard',
    })
})

app.controller('loginController', function($scope,$location,$rootScope) {
    console.warn('login page called')
    $scope.showHeader = false;
    $rootScope.settingsOption = false;
    $scope.title = 'Login | SignUP'
    $scope.wrongpass = '';
    $rootScope.showSidebar = false;
    $scope.checkLogin =  function() {
        if($scope.password=='1') {
            console.warn('logged in')
            $scope.wrongpass = 'Success';
            $rootScope.showSidebar = true;
            $location.path('/dashboard');
            
        }
        else {
            $scope.wrongpass = 'Wrong Password entered'
        }
    }
})

app.controller('dashController', function($scope,$rootScope){
    console.warn('dashboard controller called')
    $rootScope.showSidebar = true;
    $rootScope.settingsOption = true;
})

app.controller('scheduleController', function($scope,$rootScope){
    console.warn('scheduleController called')
    $rootScope.showSidebar = true;
})

app.controller('mapGenController', function($scope,$rootScope){
    console.warn('mapGenController called')
    $rootScope.showSidebar = true;
})
app.controller('signUpcontroller', function($scope, $location) {
    console.warn('signUp controller called')
    $rootScope.showSidebar = false;
})