'use strict';

const Hapi = require( 'hapi' );
const sharp = require( 'sharp' );

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
		const fileRaw = request.payload.file;
		const fileDataBase64 = fileRaw.replace( /^data:image\/png;base64,/, '' );

		const fileBuffer = Buffer.from( fileDataBase64, 'base64' );

		sharp( fileBuffer )
			.resize( 200, 200 )
			.negate()
			.toBuffer( ( err, buffer ) => {
				reply( buffer.toString() );
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
		reply( request.payload.a + request.payload.b );
	}
} );

server.start( ( err ) => {
	if ( err ) {
		throw err;
	}
	console.log( `Server running at: ${server.info.uri}` );
} );
