const tus = require('tus-node-server');

process.on('unhandledRejection', (reason, p) => {
    console.error(reason)
})

const server = new tus.Server();
server.datastore = new tus.S3Store({
    path: '/files',
    bucket: 'my-bucket',
    accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
    secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
    region: 'eu-west-1',
    partSize: 8 * 1024 * 1024, // each uploaded part will have ~8MB,
    tmpDirPrefix: 'tus-s3-store',
    signatureVersion: 'v2',
    endpoint: 'http://127.0.0.1:9000/',
    s3BucketEndpoint: true,
    s3ForcePathStyle: true
});

const host = '127.0.0.1';
const port = 1080;
server.listen({ host, port }, () => {
    console.log(`[${new Date().toLocaleTimeString()}] tus server listening at http://${host}:${port}`);
});

server.on(tus.EVENTS.EVENT_FILE_CREATED, (event) => {
    console.log(`EVENT_FILE_CREATED ${JSON.stringify(event)}`);
});
server.on(tus.EVENTS.EVENT_ENDPOINT_CREATED, (event) => {
    console.log(`EVENT_ENDPOINT_CREATED ${JSON.stringify(event)}`);
});
server.on(tus.EVENTS.EVENT_UPLOAD_COMPLETE, (event) => {
    console.log(`EVENT_UPLOAD_COMPLETE ${JSON.stringify(event)}`);
});
