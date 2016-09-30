#!/usr/bin/env node
const _fs = require( 'fs' );
const _cwd = require('cwd')();
const _lulcannon = require( '../index.js' );

const _configFile = _cwd + '/' + process.argv[ 2 ];

const _banner = _fs.readFileSync( __dirname + '/banner.txt', 'utf8' );
const _config = JSON.parse( _fs.readFileSync( _configFile, 'utf8' ) );

_lulcannon.fire( _config );

console.log( _banner );
console.log( "\n" );
console.log( "Currently Blasting:\n" );
console.log( _config.connection.host + ' - ' + _config.queue  );
console.log( "\n" );
console.log( _config.rate !== 0 ? _config.rate + '/second' : '💀  FULL BLAST 💀' );
console.log( "\n" );
