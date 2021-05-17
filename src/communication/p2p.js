import Peer from "peerjs";

const p2p = {
    _peer: undefined,
    _connection: undefined,
    _initializePromiseResolve: undefined,
    _initializingPromise: undefined,
    isInitialized: false,
    isConnected: false,


    init(userId) {
        p2p._initializingPromise = new Promise((resolve) => {
            p2p._initializePromiseResolve = resolve;
        });

        return new Promise(resolve => {
            p2p._peer = new Peer(userId);

            p2p._peer.on('open', (id) => {
                p2p.isInitialized = true;
                resolve(id);
            });

            p2p._peer.on('error', (err) => {
                console.error(err.type, err)
            })
        });
    },

    createConnection() {
        return new Promise((resolve, reject) => {
            p2p._peer.on('connection', function (conn) {
                p2p._connection = conn;
                p2p.isConnected = true;
                p2p._initializePromiseResolve();
                resolve(conn);
            });
            p2p._peer.on('error', function (error) {
                reject(error);
            });
        })
    },

    connect(id) {
        return new Promise((resolve, reject) => {
            const conn = p2p._peer.connect(id);
            conn.on('open', function () {
                p2p._connection = conn;
                p2p.isConnected = true;
                p2p._initializePromiseResolve();
                resolve(conn);
            });
            p2p._peer.on('error', function (error) {
                reject(error);
            });
        })
    },

    onReceive(type, cb) {
        p2p._initializingPromise
            .then(() => {
                p2p._connection.on('data', (data) => {
                    console.log('received', data.type, data.data);
                    if (data && data.type === type) {
                        cb(data.data);
                    }
                })
            })
    },

    send(type, data) {
        p2p._initializingPromise
            .then(() => {
                console.log('send', type, data);
                p2p._connection.send({type, data});
            });
    },

    destroy() {
        p2p._peer.destroy();
        p2p._peer = undefined
        p2p._connection = undefined
        p2p._initializePromiseResolve = undefined
        p2p._initializingPromise = undefined
    }
};

export default p2p;
