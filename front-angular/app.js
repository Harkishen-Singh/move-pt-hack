var app = angular.module('pt_management', ['ngRoute']);

var global = {
    url:'http://127.0.0.1:5000',
    username:'test',
}

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
    .when('/addSchedule', {
        templateUrl:'./html_components/scheduleform.html',
        controller:'scheduleController',
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
        if($scope.password=='1' && $scope.username=='test') {
            console.warn('logged in')
            $scope.wrongpass = 'Success';
            $rootScope.showSidebar = true;
            global.username = 'test';
            $location.path('/dashboard');
            
        }
        else {
            $scope.wrongpass = 'Wrong Password or Username entered'
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
    $scope.addScheduleCont = function(){
        
    }
})

app.controller('mapGenController', function($scope,$rootScope,$http){
    console.warn('mapGenController called')
    $rootScope.showSidebar = true;
    $scope.showLoading = true;
    $scope.initialise = function(){
        console.warn('init called');
        $http({
            url:global.url+'/retriveTags',
            method:'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data:'username='+global.username
        })
        .then(resp=>{
            let res = resp.data;
            if(res['Success']=='Y'){
                console.warn(res['result']);
                $scope.showLoading = false;
                $scope.tags = res['result'];
            }
        })
    }
    $scope.tagDockSubmit = function(){
        console.warn('reached dock submit')
        let data = 'username='+global.username +'&type='+'dock'+'&name='+$scope.name+'&capacity='+$scope.capacity+'&type='+$scope.type;
        $http({
            url:global.url+'/addDock',
            method:'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: data
        })
        .then(response=>{
            res = response.data;
            if(res['Success']=='Y')
                console.warn('Successfully added for Dock tag');
            else
                console.warn('err occured for adding in dock tag');
                
        })
    }
    $scope.tagWareSubmit = function(){
        let data = 'username='+global.username +'&type='+'ware'+'&name='+$scope.name+'&capacity='+$scope.capacity;
        $http({
            url:global.url+'/addWare',
            method:'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: data
        })
        .then(response=>{
            res = response.data;
            if(res['Success']=='Y')
                console.warn('Successfully added for Ware tag');
            else
                console.warn('err occured for adding in Ware tag');
                
        })
    }
    $scope.tagRailSubmit = function(){
        let data = 'username='+global.username +'&type='+'rail'+'&name='+$scope.name+'&capacity='+$scope.capacity;
        $http({
            url:global.url+'/addRail',
            method:'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: data
        })
        .then(response=>{
            res = response.data;
            if(res['Success']=='Y')
                console.warn('Successfully added for rail tag');
            else
                console.warn('err occured for adding in rail tag');
                
        })
    }
    $scope.tagRoadSubmit = function(){
        let data = 'username='+global.username +'&type='+'truck'+'&name='+$scope.name;
        $http({
            url:global.url+'/addRoad',
            method:'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: data
        })
        .then(response=>{
            res = response.data;
            if(res['Success']=='Y')
                console.warn('Successfully added for truck tag');
            else
                console.warn('err occured for adding in truck tag');
                
        })
    }
    $scope.checks = function(obj){
        console.warn('this is the object from controller')
        console.warn(obj)
    }



})
app.controller('signUpcontroller', function($scope, $location, $http,$rootScope) {
    console.warn('signUp controller called')
    $rootScope.showSidebar = false;
    $scope.submitSignUP = () => {
        let data = 'email='+$scope.signup.email+'&username='+$scope.signup.username+'&password='
            +$scope.signup.password+'&mobile='+$scope.signup.mobile+'&port='+$scope.signup.port;
        console.warn(data);
        $http({
            url:global.url+'/adminSignUp',
            method: 'POST',
            headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
            data: data
        })
        .then(response => {
            let res = response.data;
            console.warn(res)
            if(res['Success']=='Y'){
                $scope.resultShow = 'Successfully signed up';
            }
            else
                $scope.resultShow = 'Sorry, some error occured';

        })
    }
    
    
})