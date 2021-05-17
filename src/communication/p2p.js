import Peer from "peerjs";

const p2p = {
    _peer: undefined,
    _connections: {},
    _initializingPromise: undefined,
    _onReceiveHandlers: [],

    isInitialized: false,
    isOwnConnectionCreated: false,

    init(userId) {
        if (!p2p._initializingPromise) {
            p2p._initializingPromise = new Promise(resolve => {
                p2p._peer = new Peer(userId);

                p2p._peer.on('open', (id) => {
                    p2p.isInitialized = true;
                    resolve(id);
                });

                p2p._peer.on('error', (err) => {
                    console.error(err.type, err)
                })
            });
        }

        return p2p._initializingPromise
    },

    createConnection(id) {
        return new Promise((resolve, reject) => {
            if (p2p.isOwnConnectionCreated) {
                resolve();
                return
            }

            p2p._peer.on('connection', function (conn) {
                p2p._connections[id] = conn;
                p2p.isOwnConnectionCreated = true;
                conn.on('data', data => {
                    p2p._receiveHandler(id, data.type, data.payload);
                });

                conn.on('close', data => {
                    console.log('closed')
                });


                resolve(conn);
            });
            p2p._peer.on('error', function (error) {
                reject(error);
            });
        })
    },

    connect(id) {
        if (p2p._connections[id]) {
            return new Promise(resolve => resolve());
        }

        return new Promise((resolve, reject) => {
            const conn = p2p._peer.connect(id);
            conn.on('open', function () {
                p2p._connections[id] = conn;
                conn.on('data', data => {
                    p2p._receiveHandler(data.id, data.type, data.payload);
                });

                conn.on('close', () => {
                    console.log('closed', id);
                    delete p2p._connections[id]
                });


                resolve(conn);
            });
            p2p._peer.on('error', function (error) {
                reject(error);
            });
        })
    },

    _receiveHandler(id, type, payload) {
        console.log('received', id, type, payload)
        p2p._onReceiveHandlers.forEach(handler => {
            if (type === handler.type) {
                handler.cb(id, payload);
            }
        })
    },

    onReceive(type, cb) {
        p2p._onReceiveHandlers.push({type, cb});
    },

    send(id, type, payload) {
        if (!p2p._connections[id]) {
            return
        }
        console.log('send', id, type, payload);
        p2p._connections[id].send({id, type, payload});

    },

    destroy() {
        p2p._peer.destroy();
        p2p._peer = undefined
        p2p._connections = {}
        p2p._initializingPromise = undefined
    }
};

export default p2p;
