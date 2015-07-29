/*	angular.module('services', ['ngResource']).
    factory('Poll', function($resource) {
    	return $resource('polls/:pollId', {}, {
              query: { method: 'GET', params: { pollId: 'polls' }, isArray: true }
    	})
    });*/

	var pollServices = angular.module('pollServices', ['ngResource']);

	pollServices.factory('Poll', ['$resource', function($resource){
		return $resource('polls/:pollId', {}, {
			query: {method:'GET', params:{pollId:'polls'}, isArray:true}
		});
	}]);
	
	pollServices.factory('socket', ['$rootScope', function($rootScope){
        var socket = io.connect();
        return {
        	on: function (eventName, callback) {
        		socket.on(eventName, function () {  
        			var args = arguments;
        			$rootScope.$apply(function () {
        				callback.apply(socket, args);
        			});
        		});
        	},
        	emit: function (eventName, data, callback) {
        		socket.emit(eventName, data, function () {
        			var args = arguments;
        			$rootScope.$apply(function () {
        				if (callback) {
        					callback.apply(socket, args);
        				}
        			});
        		})
        	}
        };
	}]);