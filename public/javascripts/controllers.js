//Controllers

surveyApp.controller('loginController', ['$scope', '$location', '$http', '$rootScope', function($scope, $location, $http, $rootScope){
    $rootScope.apiID = "@hey#r@ke$h#(%data%)dede";
    $scope.loginRequest = function(){
        var userDetails = {
            email: $scope.email,
            password: $scope.password,
            apiID: $rootScope.apiID
        };
//        console.log(userDetails);
        $http.post('/api/login', userDetails).success(function(data){
//            console.log(data);
            if(data.error){
                console.log(data.error);
            }else{
                console.log("login successfully!")
            }
             
        }).error(function(err){
            if(err.type == 1){
                console.log("Not a valid access!");
            }else{
                console.log(err.error);
            }
//            
//            console.log("No access!");
        })
//        console.log($scope.username, $scope.password)
//        if($scope.username === 'user' && $scope.password === '123'){
//            $location.path('/userHome');
//        }else if($scope.username === 'admin' && $scope.password === '123'){
//            $location.path('/adminHome');
//        }
    };
    $scope.register = function(){
        var userDetails = {
            name: $scope.name,
            email: $scope.email,
            password: $scope.password,
             apiID: $rootScope.apiID
        }
        console.log(userDetails);
        $http.post('/api/register', userDetails)
		.success(function(data){
			 console.log(data);
			// obj.projects.push(data);
		})
		.error(function(err){
			console.log(err.error);
		});
    }
    $scope.test = function(){
      console.log("test....1111");
        $scope.vote = {
            "response": [4, 3, 1, 2]
        }
//        $scope.voters = [
//            {
//                "survey":"589c54d6acafbc491644a411",
//                "voter": "589c6945e497936351a970b1",
//                "response":[],
//                "status":1,
//                "author":"589c403d0568d424fde23ce8"
//            },
//            {
//                "survey":"589c5506acafbc491644a412",
//                "voter": "589c6945e497936351a970b1",
//                "response":[],
//                "status":1,
//                "author":"589c403d0568d424fde23ce8"
//            },
//            {
//                "survey":"589c54d6acafbc491644a411",
//                "voter": "589c74f466a8ec7c503a8829",
//                "response":[],
//                "status":1,
//                "author":"589c42cb54bf6028d7e8c907"
//            },
//            {
//                "survey":"589c54d6acafbc491644a411",
//                "voter": "589c74f466a8ec7c503a882a",
//                "response":[],
//                "status":1,
//                "author":"589c42cb54bf6028d7e8c907"
//            },
//                    ];
//        console.log($scope.voters);
//        console.log("test....2222");
        $http.put('/api/vote/589c7d4c42532f02da717c3e', $scope.vote).success(function(data){
            console.log($scope.vote);
            if(data.error){
                console.log(data.error);
            }else{
                console.log("Added successfully!")
            }
             
        }).error(function(err){
            console.log(err);
            console.log("No access!");
        })
        
    };
    
}]);

//
                                 



