var app=angular.module('loginmodule',['ngCookies'])
app.controller("myCtrl",function($scope,$http,$cookies)
{
    $scope.vat="hi navneet";
    $scope.login=function()
    {
        var fn=$scope.myLogin.email;
        console.log(fn);
     $http.post("http://localhost:8086/login",$scope.myLogin).then(function(res)
     {
        if(res.data.err==0)
        {
            if(res.data.rol=="admin")
            {
          $cookies.put('email',res.data.msg);
          //$location.url('/read');
          location.href="/admin";
            } 
        }
        if(res.data.err==1)
        {
             console.log("hello2");
          $scope.mesg=res.data.msg;
        }
     })
    } 
})
