const fs = require( 'fs' );
const apiBenchmark = require( 'api-benchmark' );

const file = base64_encode( 'test.png' );

const service = {
	server1: "http://localhost:3000"
};

const routes = {
	route1: {
		method: 'post',
		route: '/',
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			file: file
		}
	},
};

const options = { minSamples: 50, maxTime: 120, maxConcurrentRequests: 5, runMode: 'parallel' };

apiBenchmark.measure( service, routes, options, ( err, results ) => {
	console.log( results.server1.route1.stats );

	apiBenchmark.getHtml( results, ( error, html ) => {
		fs.writeFileSync( `output-${Date.now()}.html`, html );
	} );
} );

function base64_encode( file ) {
	const bitmap = fs.readFileSync( file );

	return Buffer.from( bitmap ).toString( 'base64' );
}
