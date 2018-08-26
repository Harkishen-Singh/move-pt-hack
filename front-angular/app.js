var app = angular.module('pt_management', ['ngRoute']);

var global = {
    url:'https://pt-manage-backend.herokuapp.com',
    username:'test',
    map:'',
    url2:'http://move-recomm.herokuapp.com'
}

app.config(function($routeProvider,$locationProvider) {
    $routeProvider
    .when('/#!/%3F%23!',{
        templateUrl:'./html_components/login.html',
        controller:'loginController',
        title:'Login | SignUp',
    })
    .when("/",{
        templateUrl:'./html_components/login.html',
        controller:'loginController',
        title:'Login | SignUp',
    })
    .when("/login",{
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
    .when('/assignees', {
        templateUrl:'./html_components/assignee.html',
        controller:'asssigneeController',
        title:'Assignees'
    })
    .when('/addAssignee', {
        templateUrl:'./html_components/assigneeForm.html',
        controller:'asssigneeController',
        title:'Assignees'
    })
})

app.controller('asssigneeController', function($scope,$location,$rootScope,$http) {
    console.warn('assignee controller called')
    $rootScope.showSidebar = true;
    $rootScope.settingsOption = true;
    $scope.addAssignee = function() {
        let data = 'username='+$scope.assignee_form.username+'&password='+$scope.assignee_form.password
            +'&name='+$scope.assignee_form.name+'&master='+global.username+'&task='+$scope.assignee_form.task
        $http(
            {url:global.url+'/assigneeAdd',
            method:'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data:data}
        )
        .then(resp=>{
            res=resp.data;
            if(res['Success']=='Y'){
                $scope.wrongpass = 'Success';
                $rootScope.showSidebar = true;
                setTimeout($location.path('/assignees'),2000)
            }
            else{
                $scope.wrongpass = 'Error occurred while Adding assignee'
            }
        })

    }
    $scope.retriveAssignees = function(){
        $scope.showLoading = true;
        $http(
            {url:global.url+'/assignee',
            method:'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data:'master='+global.username
        }
        )
        .then(resp=>{
            res=resp.data;
            if(res['Success']=='Y'){
                $scope.showLoading = false;
                $scope.ass = res['result'];
            }
            else{
                console.error('error occurred while requesting for asignee list')
                $scope.showLoading = false;
            }
        })
    }
    $scope.removeAss = function(username) {
        $http(
            {url:global.url+'/delAssignee',
            method:'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data:'master='+global.username+'&username='+username
        }
        )
        .then(resp=>{
            res=resp.data;
            if(res['Success']=='Y'){
                alert('Removed Assignee '+username+'. Refresh to see the effect.');
            }
            else{
                alert('Error Removing Assignee '+username);
            }
        })
    } 
})

app.controller('loginController', function($scope,$location,$rootScope,$http) {
    console.warn('login page called')
    // $location.path('/login')
    $scope.showHeader = false;
    $rootScope.settingsOption = false;
    $scope.title = 'Login | SignUP'
    $scope.wrongpass = '';
    $rootScope.showSidebar = false;
    $scope.checkLogin =  function(v) {
        console.warn(v);
        $scope.showLoader=true;
        $http(
            {url:global.url+'/login',
            method:'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data:'username='+$scope.username+'&password='+$scope.password}
        )
        .then(resp=>{
            res=resp.data;
            if(res['Success']=='Y'){
                $scope.showLoader=false;
                $location.path('/dashboard');
                console.warn('logged in')
                global.username = $scope.username;
                $scope.wrongpass = 'Success';
                $rootScope.showSidebar = true;

                
            }
            else{
                $scope.wrongpass = 'Wrong Password or Username entered'
                $scope.showLoader=false;
            }
        })
    }
})


app.controller('dashController', function($scope,$rootScope,$http){
    let finalLenghtsArr = [];
    $scope.fetchAssignee = function(){
        console.warn('fetch assignee called')
        $http(
            {url:global.url+'/assignee',
            method:'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data:'master='+global.username
        }
        )
        .then(resp=>{
            res=resp.data;
            if(res['Success']=='Y'){
                $scope.assss2 = res['result'];
                console.warn('assignees below')
                console.warn(res['result'])
            }
            else{
                console.error('error occurred while requesting for asignee list')
                $scope.showLoading = false;
            }
        })
    }

    $scope.defaultDistances = function() {
        var allTags = [];
        console.warn('defaultDistances called');
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
                // console.warn(res['result']);
                // $scope.showLoading = false;
                // $scope.tags = res['result'];
                allTags = res['result'];
                let donePorts=[];
        let lengths = [];
        
        for(i=0;i<allTags.length;i++){

            for(j=i+1;j<allTags.length-1;j++) {
                let xP1 = allTags[i]['marginLeft'],yP1=allTags[i]['marginTop'],
                    xP2 = allTags[j]['marginLeft'],yP2=allTags[j]['marginTop'];
                let lenObj = {
                        'station1':'',
                        'station2':'',
                        'station1Type':'',
                        'station2Type':'',
                        'xpixels':'',
                        'ypixels':'',
                        'distance':'',
                    }
                xDiff = Math.abs(parseFloat(xP1.substr(0,xP1.length-2)) - parseFloat(xP2.substr(0,xP2.length-2))) ; 
                yDiff = Math.abs(parseFloat(yP1.substr(0,yP1.length-2)) - parseFloat(yP2.substr(0,yP2.length-2))) ; 
                sqsX = xDiff*xDiff;
                sqsY = yDiff*yDiff;
                distPx = Math.sqrt(sqsX+sqsY);
                dist = distPx * 5;
                lenObj.station1Type = allTags[i]['type'];
                lenObj.station2Type = allTags[j]['type'];
                lenObj.station1 = allTags[i]['name'];
                lenObj.station2 = allTags[j]['name'];
                lenObj.xpixels = xDiff;
                lenObj.ypixels = yDiff;
                lenObj.distance = dist.toFixed(1); 
                lengths.push(lenObj);
            }
        }
        for(o=0;o<lengths.length;o++) {
            if(!((lengths[o]['station1Type'] == 'Passenger' || lengths[o]['station1Type'] == 'Cargo' || lengths[o]['station1Type'] == 'Others') 
            &&
            (lengths[o]['station2Type'] == 'Passenger' || lengths[o]['station2Type'] == 'Cargo' || lengths[o]['station2Type'] == 'Others'))
            ){
                finalLenghtsArr.push(lengths[o]);
            }
        }
        $scope.distances = finalLenghtsArr;
        console.log(finalLenghtsArr)
            }
            else{
                console.error('some err occurred while retriving tags');
                
            }
        })
        
    }
    // defaultDistances();

    $scope.assigneeParticular = function(username, consignmentid) {
        console.warn(username+' '+consignmentid)
        $http({
            url:global.url+'/assigneeParticular',
            method:'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data:'master='+global.username+'&username='+username+'&id='+consignmentid
        })
        .then(resp => {
            res = resp.data;
            if(res['Success']=='Y') {
                alert('Schedule with consignment ID : '+consignmentid+' has been assigned Dock : '+username)
            }
            else{
                alert('Failed to Assign Dock')
            }
        })
    }
    
    $scope.assignDock = function(name,id) {
        $http({
            url:global.url+'/assignDock',
            method:'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data:'username='+global.username+'&id='+id+'&name='+name
        })
        .then(resp => {
            res = resp.data;
            if(res['Success']=='Y') {
                alert('Schedule with consignment ID : '+id+' has been assigned Dock : '+name)
            }
            else{
                alert('Failed to Assign Dock')
            }
        })
    }

    console.warn('dashboard controller called')
    $rootScope.showSidebar = true;
    $rootScope.settingsOption = true;
    $scope.showNone = true;
    $scope.fetchSchedules = function() {
        $scope.showLoading1 = true;
        
        $http({
            url:global.url+'/schedules',
            method:'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data:'username='+global.username
        })
        .then(resp => {
            res = resp.data;
            if(res['Success']=='Y') {
                $scope.sched = res['result'];
                $scope.showLoading1=false;
            }
        })
    }
    $scope.assigneInit = function (id) {
        console.warn('assigne called')

    }
    $scope.fetchSchDetails = function(id, src, dest) {
        console.warn('fetchSchDetails called id:'+id)
        $scope.showLoading2 = true;
        $scope.showRecomm = false;
        $http({
            url:global.url2+'/getRecommendation',
            method:'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data:'srccode='+src+'&destcode='+dest
        })
        .then(resp => {
            res = resp.data;
            console.warn('recomm below')
            console.warn(res)
            $scope.showRecomm=true;
            $scope.recommendation = res;
        })

        $http({
            url:global.url+'/dockDetails',
            method:'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data:'username='+global.username
        })
        .then(resp => {
            res = resp.data;
            if(res['Success']=='Y') {
                console.warn('dock details below');
                console.warn(res['result'])
                $scope.docks = res['result'];
            }
        })

        $http({
            url:global.url+'/scheduleDetails',
            method:'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data:'consignmentid='+id
        })
        .then(resp => {
            res = resp.data;
            if(res['Success']=='Y') {
                console.warn('schedule details below')
                console.warn(res['result'])
                $scope.sc = res['result'];
                $scope.showNone=false;
                $scope.showLoading2=false;
            }
        })
    }

})

app.controller('scheduleController', function($scope,$rootScope,$http,$location){
    console.warn('scheduleController called')
    $rootScope.showSidebar = true;

    $scope.deleteSchd = function(id){
        console.warn('delete schedule called');
        $http({
            url:global.url+'/delSchedule',
            method:'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data:'id='+id
        })
        .then(resp => {
            res = resp.data;
            if(res['Success']=='Y') {
                alert('Schedule with consignment ID : '+id+' is removed successfully. Refresh to see the effect')
            }
            else{
                alert('Error removing Schedule with consignment ID : '+id)
            }
        })
    }

    $scope.addinit = function() {
        console.warn('addinit called');
        
        $scope.codes = ['JNPT' ,'DD', 'TICD', 'CWCJ', 'BNGD', 'PNCS', 'CSTN', 'CCMP', 'ICDD', 'CCTB', 'GRFV', 'KTIG', 'ICDM', 'ACDA', 'MKPP', 'CCTA',
             'CGPT', 'MATP', 'DCCS', 'CRNM', 'HTPP', 'CMCT', 'CKYR', 'ICMB', 'GDGH', 'ICDY', 'ICBD', 'ICDG', 'MLSW', 'CWCN', 'MRWN', 'DLIB',
              'ICDK', 'RICD', 'CRCC', 'MILK', 'HTSD', 'IBBM', 'DRTA', 'KIFH',
             'DICD', 'ICDS', 'CMLK', 'CRTK', 'HZL', 'LNN', 'CGDM', 'NTSJ', 'DGFJ', 'BTBR'];
    }
    $scope.fetchSchedules = function() {
        $scope.showLoading = true;
        $http({
            url:global.url+'/schedules',
            method:'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data:'username='+global.username
        })
        .then(resp => {
            res = resp.data;
            if(res['Success']=='Y') {
                $scope.sched = res['result'];
                $scope.showLoading=false;
            }
        })
    }
    $scope.addScheduleCont = function(){
        let data = '&consignmentid='+$scope.schedule_form.consignmentid+'&userregtime='+$scope.schedule_form.userregtime+'&indentcomm='+$scope.schedule_form.indentcomm
            +'&indenttrain='+$scope.schedule_form.indenttrain+'&indentwagon='+$scope.schedule_form.indentwagon+'&type='+$scope.schedule_form.type+
            '&srcstncode='+$scope.schedule_form.srcstncode+'&srcdeptime='+$scope.schedule_form.srcdeptime+'&disttravel='+$scope.schedule_form.disttravel+'&deststncode='+$scope.schedule_form.deststncode+
            '&destarrivaltime='+$scope.schedule_form.destarrivaltime+'&unload_strt_time='+$scope.schedule_form.unload_strt_time+'&unload_end_time='+$scope.schedule_form.unload_end_time;
            $scope.result='';

        

        $http({
            url:global.url+'/addSchedules',
            method:'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data:'username='+global.username+data
        })
        .then(resp=>{
            let res = resp.data;
            if(res['Success']=='Y'){
                $scope.result = 'Added Successfully!'
                $location.path('/schedules')
            }
            else
            $scope.result = 'Some Error occured'
        })
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
            else{
                console.error('some err occurred while retriving tags');
                
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