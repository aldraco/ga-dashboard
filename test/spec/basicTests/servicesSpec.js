// servicesTesting
'use strict';

describe('Dashboard Factory: \n', function() {
	beforeEach(module('EventsDashboard'));

	it('should get an instance of my Factory', inject(function(EventsFactory) {
		expect(EventsFactory).toBeDefined();
	}));
});


