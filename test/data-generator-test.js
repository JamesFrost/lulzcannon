const _assert = require( 'assert' );

describe('data-generator', function()
{
	const generate = require( './../src/data-generator.js' );

	describe('object templates', function()
	{
		describe('string', function()
		{
			it('timestamp', function()
			{
				const template = '{{ date}}';
				const expected = /[0-9]+/;
				const actual = generate.generate( template );

				_assert( expected.test( actual ), template );
			});

			it('dateFormat', function()
			{
				const template = '{{dateFormat hh:mm:ss }}';
				const expected = /[0-9]{2}:[0-9]{2}:[0-9]{2}/;
				const actual = generate.generate( template );

				_assert( expected.test( actual ), template );
			});

			it('number range', function()
			{
				const template = '{{ 0..5 }}';
				const expected = /[0-5]/;
				const actual = generate.generate( template );

				_assert( expected.test( actual ), template );
			});
		});

		describe('object', function()
		{
			it('basic', function()
			{
				const template = { range : '{{ 1,1 }}' };
				const actual = generate.generate( template );

				_assert( /1/.test( actual.range ), template );
			});

			it('nested', function()
			{
				const template = { date : { string: '{{dateFormat hh:mm:ss }}', timeStamp : '{{date}}' }, range : '{{ 1,1 }}' };
				const actual = generate.generate( template );

				_assert( /[0-9]{2}:[0-9]{2}:[0-9]{2}/.test( actual.date.string ), template );
				_assert( /[0-9]+/.test( actual.date.timeStamp ), template );
				_assert( /1/.test( actual.range ), template );
			});
		});
	});

	describe('dynamic content checker', function()
	{
		describe('string', function()
		{
			it('static', function()
			{		
				const template = 'foobar.';

				_assert( !generate.hasDynamicContent( template ) );
			});

			it('dynamic', function()
			{
				const template = '{{date}}';

				_assert( generate.hasDynamicContent( template ) );
			});
		});

		describe('object', function()
		{
			it('static', function()
			{		
				const template = {foobar:{foo:'foobar.'}};

				_assert( !generate.hasDynamicContent( template ) );
			});

			it('dynamic', function()
			{
				const template = {foobar:{foo:'{{date}}'}};

				_assert( generate.hasDynamicContent( template ) );
			});
		});
	});
});
