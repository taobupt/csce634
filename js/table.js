'use strict';
var animateApp = angular.module('animateApp', ['ui.router', 'ngAnimate','ng-backstretch','ngMaterial','ngSanitize','ngProgress','ui.navbar','ngStorage','ngCookies','thatisuday.ng-image-gallery']);
animateApp.config(function ($stateProvider,$urlRouterProvider,$sceProvider,ngImageGalleryOptsProvider) {

    ngImageGalleryOptsProvider.setOpts({
        thumbnails  	:   false,
        thumbSize		: 	40,
        inline      	:   true,
        bubbles     	:   true,
        bubbleSize		: 	10,
        imgBubbles  	:   false,
        bgClose     	:   false,
        piracy 			: 	false,
        imgAnim 		: 	'pop'
    });
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home',{
            url: '/home',
            templateUrl:'home.html',
            controller:'mainController'
        })
        .state('display',{
            url: '/display',
            templateUrl:'display.html'
        })
        .state('yourselfCourses',{
            url: '/yourselfCourses',
            templateUrl:'static/partials/yourCourses.html',
            controller:'yourCoursesController',
            resolve: {
               accessToken: ['$localStorage','$state','$cookies', function($localStorage,$state,$cookies){
                   if($cookies.get('accessToken')){
                        return $cookies.get('accessToken')
                   }
                   else {
                        $state.go('home');
                        return undefined;
                   }
                }]
            }
        })
        .state('classes',{
            url: '/classes',
            templateUrl:'static/partials/classes.html',
            controller:'classesController',
            resolve: {
               accessToken: ['$localStorage','$state','$cookies', function($localStorage,$state,$cookies){
                   if($cookies.get('accessToken')){
                        return $cookies.get('accessToken')
                   }
                   else {
                        $state.go('home');
                        return undefined;
                   }
                }]
            }
        })
});


// CONTROLLERS ============================================
// home page controller
animateApp.controller('mainController', function($rootScope,$scope,$http,$state,$mdDialog,ngProgressFactory,$cookies) {
    $rootScope.moisture = "A";
    $scope.images = [
        '../img/background/1.jpg',
        '../img/background/2.jpg'
    ];
});

// about page controller
animateApp.controller('yourCoursesController', function($scope,$rootScope,$sce,$http,ngProgressFactory,$state,$cookies) {
    var text = "<input type='button' value='Drop' class='btn btn-warning btn-xs'>";
    text = $sce.trustAsHtml(text);
    console.log("yourCoursesController");
    $scope.logout=function () {
        $cookies.remove('accessToken');
        $state.go('home');
    };
    console.log($rootScope.yourCourses);
    if($cookies.get('accessToken') && $rootScope.yourCourses===undefined){
        $scope.progressbar = ngProgressFactory.createInstance();
        $scope.progressbar.setColor("#ffff00");
        $scope.progressbar.start();
        $rootScope.yourCourses=[];
        $http({
            url:"http://127.0.0.1:5000/getYourCourses",
            method:'GET'
        }).then(function (response) {
            console.log("innner part");
            $rootScope.yourCourses=[];
            $scope.progressbar.complete();
            var data = response.data;
            var d = {'Status':'**Web Registered** on Apr 07, 2017','Action':text,'CRN':'31266','Subj':'CSCE','Crse':'634','Sec':'600','Level':'Graduate','Cred':'3','Title':'INTELL USER INTERFACE'};
            var len = data.length;
            for(var i=0;i<len;++i){
                var ind =0;
                var tmp ={};
                for(var prop in d){
                    tmp[prop]=data[i][ind];
                    ind++;
                }
                tmp['Action']=text;
                $rootScope.yourCourses.push(tmp);
            }
        },function (error) {
            window.alert(error);
        })
    }
});

// contact page controller
animateApp.controller('contactController', function($scope) {
    $scope.pageClass = 'page-contact';
});


animateApp.controller('treeController', function($scope,$rootScope,$sce,$http,ngProgressFactory,$state,$cookies,$timeout, $interval) {
    // Local images
    $scope.images = [
        {
            id: 546,
            alt : 'photo1',
            url : '../img/trees/1.jpg',
            //thumbUrl : '../bower_components/ng-image-gallery/demo/demo-images/thumbs/1.jpg',
            //bubbleUrl : '../bower_components/ng-image-gallery/demo/demo-images/bubbles/1.jpg',
        },
        {
            id: 892,
            url : '../img/trees/2.jpg',
            //thumbUrl : '../bower_components/ng-image-gallery/demo/demo-images/thumbs/2.jpg',
            //bubbleUrl : '../bower_components/ng-image-gallery/demo/demo-images/bubbles/2.jpg',
            //desc : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: 5454,
            url : '../img/trees/3.jpg',
            //thumbUrl : '../bower_components/ng-image-gallery/demo/demo-images/thumbs/3.jpg',
            // bubbleUrl : '../bower_components/ng-image-gallery/demo/demo-images/bubbles/3.jpg',
            //deletable : true
        }
    ];

});

animateApp.controller('shrubController', function($scope,$rootScope,$sce,$http,ngProgressFactory,$state,$cookies,$timeout, $interval) {
    // Local images
    $scope.images = [
        {
            id: 5460,
            alt : 'photo1',
            url : '../img/shrubs/1.jpg',
            //thumbUrl : '../bower_components/ng-image-gallery/demo/demo-images/thumbs/1.jpg',
            //bubbleUrl : '../bower_components/ng-image-gallery/demo/demo-images/bubbles/1.jpg',
        },
        {
            id: 8920,
            url : '../img/shrubs/2.jpg',
            //thumbUrl : '../bower_components/ng-image-gallery/demo/demo-images/thumbs/2.jpg',
            //bubbleUrl : '../bower_components/ng-image-gallery/demo/demo-images/bubbles/2.jpg',
            //desc : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: 54540,
            url : '../img/shrubs/3.jpg',
            //thumbUrl : '../bower_components/ng-image-gallery/demo/demo-images/thumbs/3.jpg',
            // bubbleUrl : '../bower_components/ng-image-gallery/demo/demo-images/bubbles/3.jpg',
            //deletable : true
        }
    ];

});

animateApp.controller('perennialController', function($scope,$rootScope,$sce,$http,ngProgressFactory,$state,$cookies,$timeout, $interval) {
    // Local images
    $scope.images = [
        {
            id: 5461,
            alt : 'photo1',
            url : '../img/perennials/1.jpg',
            //thumbUrl : '../bower_components/ng-image-gallery/demo/demo-images/thumbs/1.jpg',
            //bubbleUrl : '../bower_components/ng-image-gallery/demo/demo-images/bubbles/1.jpg',
        },
        {
            id: 8921,
            url : '../img/perennials/2.jpeg',
            //thumbUrl : '../bower_components/ng-image-gallery/demo/demo-images/thumbs/2.jpg',
            //bubbleUrl : '../bower_components/ng-image-gallery/demo/demo-images/bubbles/2.jpg',
            //desc : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: 54541,
            url : '../img/perennials/3.png',
            //thumbUrl : '../bower_components/ng-image-gallery/demo/demo-images/thumbs/3.jpg',
            // bubbleUrl : '../bower_components/ng-image-gallery/demo/demo-images/bubbles/3.jpg',
            //deletable : true
        }
    ];

});

animateApp.controller('recommendController', function($scope) {
});

//directives
animateApp.directive("removeMe", function($rootScope) {
      return {
            link:function(scope,element,attrs)
            {
                element.bind("click",function() {
                    element.remove();
                });
            }
      }
});