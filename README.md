# lulzcannon
Simple RabbitMQ stress tester in Nodejs

```bash
npm install -g lulzcannon
```

## Usage
### Command Line
```bash
lulzcannon stress.json
```
Where 'stress.json' is a file containing configuration.

### Code
```js
var lulzcannon = require( 'lulzcannon' );

lulzcannon.fire( config, function( stop )
{
  // will stop stressing when 'stop()' is called
});
```

## Config
```json
{
	"connection" : 
	{
		"host": "url",
		"port" : 5672,
		"login" : "username",
		"password" : "pass"	
	},
	"queue" : "a_queue",
	"rate" : 300,
	"concurrent" : 4,
	"data" : 
	[
        "some data 1",
        "some data 2"
	]
}

```

### Connection
Connection parameters - more information can be found <a href="https://www.npmjs.com/package/amqp#connection">here</a>.

### Queue
Queue to fire data into.

### Rate
How fast data should be sent to rabbit - publishes per second.

### Data
Data in this array will be randomly selected and sent to rabbit.

## License
MIT
