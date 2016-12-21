'use strict';

const sharp = require( 'sharp' );

const Microscopic = require( 'microscopic' );
const microscopic = new Microscopic( {
	etcd: {
		hosts: [ 'http://etcd:2379' ]
	}
} );

const imageService = microscopic.createService( 'image-service', {
	transport: { type: 'microscopic-tcp-transport' },
	loadbalancer: 'microscopic-roundrobin-load-balancer',
} );

imageService.addMethod( {
	name: 'process',
	handler: ( request, reply ) => {
		const fileRaw = request.params.file;
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

imageService.addMethod( {
	name: 'process-1',
	handler: ( request, reply ) => {
		reply( request.params.a + request.params.b );
	}
} );

imageService.start();
