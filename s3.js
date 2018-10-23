const S3rver = require('s3rver');
let instance;

instance = new S3rver({
    port: 4569,
    hostname: 'localhost',
    silent: false,
    directory: './tmp-s3'
}).run((err, host, port) => {
    if(err) {
      console.error(err)
    }
    console.log(`Listening ${host}:${port}`)
});

instance.s3Event.subscribe(function (event) {
    console.log(event);
});

