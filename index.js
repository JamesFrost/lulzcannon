const _temporal = require( 'temporal' );
const _amqp = require( 'amqp' );
const _async = require( 'async' );

exports.fire = function( _config, callback )
{
	const _rate = _config.rate === 0 ? 1 : Math.round( (1000 / _config.rate) * _config.concurrent );

	const _connection = _amqp.createConnection( _config.connection );

	const _stressTestLoop = function()
	{
		return _temporal.loop(_rate, function() 
		{
			const data = _config.data[ Math.floor( Math.random() * _config.data.length ) ];

			_connection.publish( _config.queue, data );
		});
	};	

	_connection.on('ready', function () 
	{
		var tasks = [];

		for ( var i = _config.concurrent; i > 0; i-- ) 
			tasks.push( _stressTestLoop );

		_async.parallel( tasks );

		if( callback == undefined )
			return;

		callback(function()
		{
			tasks.map( x => x.stop() );
		});
	});
};
