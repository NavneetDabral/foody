var app = angular.module('FoodPanda',['ui.router','ngCookies','ngCart']);
app.run(function($rootScope,$http)
{
     $rootScope.search=function()
      {
          console.log($rootScope.Search)
     $http.get("http://127.0.0.1:8086/searchfood/"+$rootScope.Search.Cuisine+"/"+$rootScope.Search.Restaurant).then(function(res)
            {
                $rootScope.searfood=res.data.data;
                console.log(res.data)
            })
      }
})
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
				$urlRouterProvider.otherwise("/home")
				$stateProvider.state('home', {
            url: '/home',
            templateUrl: 'front.html'
                     })
            .state('restaurant',
                    {       url: "/restaurants",
                            templateUrl: "restaurant.html",
                            controller:function($scope,$http,$filter)
                      {
                      $http.get("http://127.0.0.1:8086/fetch_rest").then(function(res)
                     {
                       $scope.rest=res.data.data;
                        console.log(res.data)
                           })
                    $scope.currentPage = 0;
                    $scope.pageSize = 8;
                    $scope.data = [];
                    $scope.q = '';
                    $scope.getData = function () {
                    return $filter('filter')($scope.data, $scope.q)
                    }
                    
                    $scope.numberOfPages=function(){
                        return Math.ceil($scope.getData().length/$scope.pageSize);                
                    }
                    for (var i=0; i<65; i++) {
                    $scope.data.push("r"+i);
    }
                      }
                    })
            .state('restaurant.categories', {
              url: "restaurant/categories?restaurant",
              templateUrl: "categories.html",
              controller:function($scope,$stateParams,$http)
           {
            $http.get("http://127.0.0.1:8086/category/"+$stateParams.restaurant).then(function(res)
            {
                $scope.cat=res.data.data;
                $scope.value=$scope.cat[0].restname;
                console.log(res.data)
            })
           }
          })
        .state('restaurant.categories.foodpage',{
            url:"categories/foodpage?food?resname",
            templateUrl:"foodpage.html",
            controller:function($scope,$stateParams,$http,ngCart)
           {   
                ngCart.setTaxRate(7.5);
                ngCart.setShipping(2.99); 
               console.log($stateParams.resname)
               console.log($stateParams.food)
            $http.get("http://127.0.0.1:8086/getfood/",{params:{paramOne:$stateParams.food,paramTwo:$stateParams.resname}}).then(function(res)
            {
                $scope.cat=res.data.data;
                console.log(res.data)
            })
           }
        })
               .state('restaurant.categories.foodpage.cart',{
                    url:"foodpage/addtocart",
                    templateUrl:"cart.html"
                      })
						.state('login', {
							url: "/login",
                            templateUrl: "login.html",
                            controller:"loginCtrl"
                        })
                        .state('register',
                    {       url: "/register",
                            templateUrl: "register.html",
                            controller:"regisCtrl"

                    })
                        .state('category',
                    {       url: "/category",
                            templateUrl: "category.html",
                            controller:function($scope,$http)
        { 
            console.log("hi");
     //request to get category list
             $http.get("http://localhost:8086/fetch_category").then(function(res)
           {
           $scope.catname=res.data.data;
           console.log(res.data)
      })
        }
                    })
                        .state('read',{      
                             url: "/read",
                            template:'welcome : {{user}}',
                            controller:function($scope,$cookies)
                          {
                             $scope.user=$cookies.get('email');
                                }
                    })
                            .state('order',{      
                             url: "/orders",
                            templateUrl:"order.html"
                    })

            }]);
//login controller
    app.controller('loginCtrl',function($scope,$http,$cookies,$location)
{
    $scope.login=function()
    {
     $http.post("http://127.0.0.1:8086/login",$scope.myLogin).then(function(res)
     {
        if(res.data.err==0)
        {
         $cookies.put('email',res.data.msg);
          $location.url('/read');
            }
        if(res.data.err==1)
        {
             console.log("hello2");
          $scope.mesg=res.data.msg;
        }
     })
    } 
})
    //registration controller
app.controller('regisCtrl',function($scope,$http)
{ 
  $scope.regis=function()
  {
      var fn=$scope.myData.fn;
      var ln=$scope.myData.ln;
      var email=$scope.myData.email;
      var pass=$scope.myData.pass;
      var cpass=$scope.myData.cpass;
      console.log($scope.myData);
      if(pass==cpass)
      {
     data={fnn:fn,lnn:ln,emaill:email,passs:pass};
 $http.post("http://127.0.0.1:8086/regis",data).then(function(res)
  {
      //console.log(res.data);
      $scope.data=res.data;
      $scope.myData={};
      $scope.ms="Registered successfully"
  })
      }
      else
      {
          $scope.data={err: 1, msg: "Pass & cpass is not match"};
          console.log("hello");
      }
  }
})
app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
})
