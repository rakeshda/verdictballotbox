//Routes
surveyApp.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl:'partials/routes/login.htm',
        controller: 'loginController'
    })
    .when('/login', {
        templateUrl:'partials/routes/login.htm',
        controller: 'loginController'
    })
    .when('/register', {
        templateUrl:'partials/routes/register.htm',
        controller: 'loginController'
    })
    .otherwise(
        {
            redirectTo: '/'
        }
    )
    
});