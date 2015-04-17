describe('custom directives: admin panel', function() {
	var elem, scope;

	beforeEach(module('EventsDashboard'));

	// this is compiled as a module by the preprocessor
	beforeEach(module('Templates'));


	describe('Admin Panel:', function() {
		beforeEach(inject(function($rootScope, $compile) {
			elem = angular.element(
				'<div>' +
					'<admin-navpanel></admin-navpanel>' +
				'<div>');
			scope = $rootScope;
			$compile(elem)(scope);
			scope.$digest();
		}));


		it('replaces the element with the correct content', inject(function($compile, $rootScope) {
			var links = elem.find('ul li a');

			expect(elem.html()).toContain("Summary");
			//expect(elem.html()).toContain("User Statistics");
		}));

	});

	describe('By Country:', function() {
		beforeEach(inject(function($rootScope, $compile) {
			elem = angular.element('<by-country-chart></by-country-chart>');
			scope = $rootScope;
			$compile(elem)(scope);
			scope.$digest();
		}));


		it('replaces the element with the correct content', inject(function($compile, $rootScope) {
				expect(elem.attr('class')).toContain('chart-pie');
				expect(elem.attr('data').length).toBeGreaterThan(1);
		}));

	});





});