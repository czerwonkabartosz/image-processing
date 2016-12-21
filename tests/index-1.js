const fs = require( 'fs' );
const apiBenchmark = require( 'api-benchmark' );

const service = {
	server1: "http://localhost:3000"
};

const routes = {
	route1: {
		method: 'post',
		route: '/test1',
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			a: 11111,
			b: 22222
		}
	},
};

const options = { minSamples: 200, maxTime: 60, maxConcurrentRequests: 10, runMode: 'parallel' };

apiBenchmark.measure( service, routes, options, ( err, results ) => {
	console.log( results.server1.route1.stats );

	apiBenchmark.getHtml( results, ( error, html ) => {
		fs.writeFileSync( `output-${Date.now()}.html`, html );
	} );
} );
