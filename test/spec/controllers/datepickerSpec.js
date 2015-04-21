// datepicker controller test
'use strict';

beforeEach(module('EventsDashboard'));

describe("Datepicker Controller:\n", function() {

	var $scope;

	beforeEach(inject(function($rootScope, $controller) {
		$scope = $rootScope.$new();
		var DatePickerCtrl = $controller('DatepickerCtrl', {$scope:$scope});
	}));

	it('should initialize a controller with two dates in the scope', function() {			

		expect($scope.startDate).not.toBe(undefined);
		expect($scope.startDate).toEqual(jasmine.any(Date));
		expect($scope.endDate).toEqual(jasmine.any(Date));
	});

	it('should set the maximum date as today', function() {
		expect($scope.maxDate).toEqual(jasmine.any(Date));
	});

	// TODO mock out choosing a date, and check that the two dates are not the same.

});