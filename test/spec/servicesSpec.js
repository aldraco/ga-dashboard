// servicesTesting

describe('EventsFactory test\n', function() {
	beforeEach(module('EventsDashboard'));

	it('EventsFactory should return several events from the server.', 
		inject(function(EventsFactory) {
		expect(EventsFactory.length).not.toBe.(undefined);
	}));

});