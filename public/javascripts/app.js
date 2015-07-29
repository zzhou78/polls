        /*angular.module('polls', [pollServices])*/
/*        angular.module('polls', [])
          .config(['$routeProvider', function($routeProvider) {
            $routeProvider.
              when('/polls', { templateUrl: 'partials/list.html', controller: PollListCtrl }).
              when('/poll/:pollId', { templateUrl: 'partials/item.html', controller: PollItemCtrl }).
              when('/new', { templateUrl: 'partials/new.html', controller: PollNewCtrl }).
              otherwise({ redirectTo: '/polls' });
          }]);*/
	var app = angular.module('polls', ['ngRoute', 'pollControllers', 'pollServices']);
	app.config(['$routeProvider', function($routeProvider){
		$routeProvider
		  .when('/polls', {
		        templateUrl: 'partials/list.html',
		        controller: 'PollListCtrl',
		        controllerAs: 'list'
		      })
		  .when('/poll/:pollId', {
		        templateUrl: 'partials/item.html',
		        controller: 'PollItemCtrl',
		        controllerAs: 'item'
		      })
		  .when('/new', {
		        templateUrl: 'partials/new.html',
		        controller: 'PollNewCtrl',
		        controllerAs: 'new'
		      })
		  .otherwise({ redirectTo: '/polls'});
	}]);
