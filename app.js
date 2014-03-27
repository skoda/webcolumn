var Hapi = require("hapi"),
	fs = require("fs"),
	Handlebars = require('handlebars'),
	Helpers = require('./lib/helpers'),
	Routes = require('./lib/routes'),

	config = {
		port: process.env.PORT
	},

	options = {
		views: {
			path: './views',
			engines: {
				hbs: 'handlebars'
			},
			isCached: process.env.NODE_ENV === 'production' // only cache on production
		}
	},

	lenientRoute = function _lenientRoute (routeOptions) {
		server.route(routeOptions);
		routeOptions.path += '/';
		server.route(routeOptions);
	};
	
// init the server
server = Hapi.createServer("0.0.0.0", config.port, options);

// register handlebars helpers
Handlebars.registerHelper(Helpers);

// register routes
server.route({
	method: 'GET',
	path: '/',
	config: {
		handler: Routes.renderIndex
	}
});

lenientRoute({
	method: 'GET',
	path: '/entry/{slug}',
	config: {
		handler: Routes.renderEntry
	}
});

// static files
server.route({
	method: 'GET',
	path: '/{path*}',
	handler: {
		directory: { path: './public', listing: false, index: false }
	}
});

// start the server
server.start();
console.log("Server started on port: " + config.port);
