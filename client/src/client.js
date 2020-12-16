const client = require('websocket').client;
const express = require('express');

module.exports = class Client {
	constructor(ip, port, name) {
		this.ip = ip;
		this.port = port;
		this.name = name;

		this.ws = null;
		this.reconnecting = true;
		this.reconnectingTime = 1000;
		this.app = express();
		this.pendingResult = null;
		this.killed = false;
	}

	async connect() {
		const promise = new Promise((resolve) => {
			this.ws = new client();
			this.ws.on('connect', (connection) => {
				console.log('Connected.');
				this.reconnectingTime = 1000;

				// sends name to the server
				connection.send(JSON.stringify({ type: 'connect', name: this.name }));

				connection.on('message', (message) => {
					const msg = JSON.parse(message.utf8Data);

					switch (msg.type) {
						case 'cmd':
							// pushes command to AHK
							if (this.pendingResult !== null) {
								this.pendingResult.send(msg.cmd);
								this.pendingResult = null;
							}
							break;

						case 'kill':
							// kills this client and the AHK script
							console.log('Closing...');
							this.killed = true;
							if (this.pendingResult !== null) {
								this.pendingResult.send('kill');
							}
							this.reconnecting = false;
							process.exit(0);

						default:
							// just for future expansion and debugging
							console.log(message);
							break;
					}
				});

				connection.on('close', () => {
					// resolves the promise, when the connection get closed.
					console.error('Connection closed.');
					resolve();
				});
			});

			this.ws.on('connectFailed', () => {
				// resolves the promise, when no connection can be established.
				console.error('Connection refused.');
				// doubles the reconnecting time to max 1 minute
				this.reconnectingTime = Math.min([60000, this.reconnectingTime * 2]);
				resolve();
			});
		});

		this.ws.connect(`ws://${this.ip}:${this.port}/ws`);
		return promise;
	}

	subFnctn = (req, res) => {
		this.pendingResult = res;
	};

	async serve() {
		this.app.get('/sub', this.subFnctn);
		this.app.listen(12344);
	}
};
