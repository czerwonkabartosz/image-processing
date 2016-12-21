'use strict';

const Hapi = require( 'hapi' );

const Microscopic = require( 'microscopic' );
const microscopic = new Microscopic( {
	etcd: {
		hosts: [ 'http://etcd:2379' ]
	}
} );

const imageServiceClient = microscopic.createClient( 'image-service' );

const server = new Hapi.Server();
server.connection( { port: 3000 } );

server.route( {
	method: 'POST',
	path: '/',
	config: {
		payload: {
			maxBytes: 9999999999
		}
	},
	handler: ( request, reply ) => {
		imageServiceClient.send( 'process', { params: { file: request.payload.file } }, ( error, response ) => {
			reply( response.result );
		} );
	}
} );

server.route( {
	method: 'POST',
	path: '/test1',
	config: {
		payload: {
			maxBytes: 9999999999
		}
	},
	handler: ( request, reply ) => {
		imageServiceClient.send( 'process-1', { params: { a: request.payload.a, b: request.payload.b } }, ( error, response ) => {
			reply( response.result );
		} );
	}
} );

server.start( ( err ) => {
	if ( err ) {
		throw err;
	}
	console.log( `Server running at: ${server.info.uri}` );
} );
