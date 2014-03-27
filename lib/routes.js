var siteData = require('./data');

module.exports = (function() {
		renderIndex = function _renderIndex(request, reply) {
			reply.view("index.hbs", siteData);
		},

		renderEntry = function _renderEntry(request, reply) {
			reply.view("live.hbs", data);
		};

	return {
		renderIndex: renderIndex,
		renderEntry: renderEntry
	};
})();
