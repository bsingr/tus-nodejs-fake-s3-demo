const tus = require('tus-node-server');

const server = new tus.Server();
server.datastore = new tus.S3Store({
    path: '/files',
    bucket: 'my-bucket',
    accessKeyId: 'access-key-id',
    secretAccessKey: 'secret-access-key',
    region: 'eu-west-1',
    partSize: 8 * 1024 * 1024, // each uploaded part will have ~8MB,
    tmpDirPrefix: 'tus-s3-store',
    endpoint: 'http://127.0.0.1:4569/my-bucket/',
    s3BucketEndpoint: true
});

const host = '127.0.0.1';
const port = 1080;
server.listen({ host, port }, () => {
    console.log(`[${new Date().toLocaleTimeString()}] tus server listening at http://${host}:${port}`);
});
