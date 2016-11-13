const _rangeParser = require( 'parse-numeric-range' );
const _dateFormat = require('date-format');

const _templateRegex = /{{[^}]+}}/g;

exports.hasDynamicContent = function( data )
{
	switch( typeof data ) 
	{
		case 'object':
			
			var isDynamic = false;

			for( var index in data )
			{
				if( exports.hasDynamicContent( data[ index ] ) )
					isDynamic = true;
			}

			return isDynamic;

		case 'string':
			return _templateRegex.test( data );

		default:
			return false;
	}
};

exports.generate = function( data )
{
	switch( typeof data ) 
	{
	    case 'object':

	    	var copy = {};

	    	for( var index in data )
	    		copy[ index ] = exports.generate( data[ index ] );

	    	return copy;

	    case 'string':
	        
	    	if( !/{{/.test( data ) )
	    		return data;

	    	var templates = data.match( _templateRegex );

	    	for (var i = templates.length - 1; i >= 0; i--) 
	    	{
	    		const thisTemplate = templates[ i ].replace( '{{', '' ).replace( '}}', '' ).trim();

	    		if( /^dateFormat/i.test( thisTemplate ) )
	    		{
	    			const dateTemplateString = thisTemplate.replace( 'dateFormat', '' ).trim();

	    			data = data.replace( templates[ i ], _dateFormat( dateTemplateString, new Date() ) );
	    			continue;	
	    		}

	    		if( /^date/i.test( thisTemplate ) )
	    		{
	    			data = data.replace( templates[ i ], Date.now() );
	    			continue;	
	    		}

	    		const numberRange = _rangeParser.parse( thisTemplate );

	    		if( numberRange.length !== 0 )
	    		{
	    			data = data.replace( templates[ i ], numberRange[ Math.floor( Math.random() * numberRange.length ) ] );
	    			continue;
	    		}
	    	}

	    	return data;

	        break;
	    default:
	        return attribute;
	}
};
