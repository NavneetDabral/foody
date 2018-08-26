var app=angular.module('adminpannel',['ui.router','ngCookies','ngFileUpload']);
app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider){
 $urlRouterProvider.otherwise('/');
   $stateProvider.state('addCategory',{
    url: "/addCatogory",
    templateUrl:"category.html",
    controller:function($scope,$http,Upload)
{
  $scope.addcat=function()
  {
   // console.log($scope.file)
     Upload.upload({
            url: 'http://localhost:8086/addcatimage',
            data: {file: $scope.file}
        }).then(function (resp)
         {    
          path=resp.data.path;
          console.log(path)
 $http.post("http://localhost:8086/addcat",{category:$scope.myLogin.catname,restname:$scope.myLogin.restname,image:path}).then(function(res)
     {
        console.log(res.data)
        $scope.myLogin={};
         $scope.value=1;
      $scope.ms="Added"
     })
        }, function (resp) 
        {
            console.log('Error status: ' + resp.status);
        })
   
      }
   }
 })
    .state('addRest',{
        url: "/addRestaurant", 
        templateUrl:"restaurant.html",
        controller:function($scope,$http,$cookies,$location,Upload)
        { 
            console.log("hi");
             $scope.submitForm=function()
  
   {
       Upload.upload({
            url: 'http://localhost:8086/addrestimage',
            data: {file: $scope.file}
        }).then(function (resp)
         {    
          path=resp.data.path;
 $http.post("http://localhost:8086/addrest",{Restaurant_Name:$scope.myLogin.fname,Address:$scope.myLogin.lname,description:$scope.myLogin.description,email:$scope.myLogin.email,Phone:$scope.myLogin.phone,image:path}).then(function(res)
     {
        console.log(res.data)
        $scope.myLogin={};
         $scope.value=1;
      $scope.ms="Added"
     })
        }, function (resp) 
        {
            console.log('Error status: ' + resp.status);
        })
   
      }
   }
 })
             /*           {
      var Rn=$scope.myLogin.fname;
      var Ad=$scope.myLogin.lname;
      var email=$scope.myLogin.email;
      var phone=$scope.myLogin.phone;
      var description=$scope.myLogin.description
      console.log(Rn)
     data={Rnn:Rn,Add:Ad,emaill:email,phone:phone,description:description};
 $http.post("http://localhost:8086/rest",).then(function(res)
  {
      //console.log(res.data);
      $scope.data=res.data;
      $scope.myLogin={};
      $scope.value=1;
      $scope.ms="Added"
  })

        }
     }
    })*/
    //foodpage hit to server
    .state('addFood', {
      url: "/addFood",
      templateUrl:"food.html",
      controller:function($scope,$http,Upload)
        { 
            console.log("hi");
     //request to get restaurant list
             $http.get("http://localhost:8086/fetch_rest").then(function(res)
  {
  $scope.rest=res.data.data;
  console.log(res.data)
  })
         //request to get category list
    $http.get("http://localhost:8086/fetch_cat").then(function(res)
  {
  $scope.cat=res.data.data;
  console.log(res.data)
  })
             $scope.addfood=function()
  {
   // console.log($scope.file)
     Upload.upload({
            url: 'http://localhost:8086/addfoodimage',
            data: {file: $scope.file}
        }).then(function (resp)
         {    
          path=resp.data.path;
          console.log(path);
 $http.post("http://localhost:8086/addfood",{cuisine:$scope.myLogin.cuname,restaurant:$scope.myLogin.restname,image:path,category:$scope.myLogin.catname,price:$scope.myLogin.price}).then(function(res)
     {
        console.log(res.data)
        $scope.myLogin={};
         $scope.value=1;
      $scope.ms="Added"
     })
        }, function (resp) 
        {
            console.log('Error status: ' + resp.status);
        })
   
      }
   }
 })
             /*{
 $http.post("http://localhost:8086/addfood",$scope.myLogin).then(function(res)
  {
      //console.log(res.data);
      $scope.data=res.data;
      $scope.myLogin={};
       $scope.value=1;
      $scope.ms="Added successfully"
      console.log("success");
  })

        }
     }
    })*/
    .state('orders',{
        url:"/orders",
        templateUrl:"order.html"
    })
    .state('changePassword',{
        url:"/changePassword",
        templateUrl:"changepass.html"
    })
    .state('logout',{
        url:"/logout",
        templateUrl:"logout.html",
        controller:function($scope,$location)
 {
   $scope.logout=function()
   {  
     $location.url('http://127.0.0.1:8080');
   }
}
    })					
}]);