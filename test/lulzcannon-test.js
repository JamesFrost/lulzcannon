const _assert = require( 'assert' );
const _mockery = require( 'mockery' );
const _sinon = require( 'sinon' );

describe('lulzcannon', function()
{
	var lulzcannon;
	var amqpMock;
	var amqpApi;
	var connectionMock;
	var connectionApi;

	before(function()
	{
		_mockery.enable({ 
			warnOnReplace: false, 
			warnOnUnregistered: false, 
			useCleanCache: true 
		});

	 	connectionApi = { on: function (event, fn) { fn(); }, publish: function() {} };
	    connectionMock = _sinon.mock( connectionApi );
		
	 	amqpApi = { createConnection: function () { return connectionApi; } };
	    amqpMock = _sinon.mock( amqpApi );

	    _mockery.registerMock( 'amqp', amqpApi );

	    lulzcannon = require( '../index.js' );
	});

	after(function()
	{
		_mockery.disable();
	});

	it('fires random data at rabbitmq', function( done )
	{
 		const config = 
 		{
 			"connection" : 
		    {
		        "host": "url",
		        "port" : 5672,
		        "login" : "username",
		        "password" : "pass" 
		    },
 			data :
 			[
 				'wew',
 				'lad'
 			],
 			rate : 0,
 			concurrent : 1,
 			queue : 'a_queue'
 		};

 		amqpMock.expects( 'createConnection' ).once().returns( connectionApi );

 		connectionMock.expects( 'publish' ).atLeast( 50 ).withArgs( 'a_queue' );

		lulzcannon.fire( config, function( stop )
		{
			setTimeout(function()
			{
				amqpMock.verify();
				connectionMock.verify();
				done();
			}, 500);
		});
	});
});
