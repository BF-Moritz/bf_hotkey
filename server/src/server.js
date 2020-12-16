import express from 'express';
import expressWS from 'express-ws';

export class Server {
	constructor(port) {
		this.port = port;
		this.app = express();
		this.websockets = new Map();
		this.server = null;
		expressWS(this.app);
	}

	wsRouter = (ws) => {
		ws.on('message', (msg) => {
			const message = JSON.parse(msg);
			switch (message.type) {
				case 'connect':
					this.websockets.set(message.name, ws);
					console.log(message);
					break;

				default:
					console.log(message);
					break;
			}
		});
	};

	cmdFnctn = (req, res) => {
		if (this.websockets.has(req.params.host)) {
			const ws = this.websockets.get(req.params.host);
			console.log(req.params.cmd);
			ws.send(JSON.stringify({ jsonrpc: '2.0', type: 'cmd', cmd: req.params.cmd }));
			res.send('success');
		} else {
			res.send('host not found');
		}
	};

	hostsFnctn = (req, res) => {
		const hosts = [];
		this.websockets.forEach((val, key) => {
			hosts.push(key);
		});
		res.send(JSON.stringify(hosts));
	};

	killFnctn = (req, res) => {
		this.websockets.forEach((ws, key) => {
			console.log(key);
			ws.send(JSON.stringify({ jsonrpc: '2.0', type: 'kill' }));
		});
		if (this.server !== null) {
			this.server.close();
		}
		res.send('Closed.');
		process.exit(0);
	};

	setup = async () => {
		// Websocket server for all the clients
		this.app.ws('/ws', this.wsRouter);
		// execute commands on this path. the HOST is the client and CMD is the command you want to execute
		this.app.get('/cmd/:host/:cmd', this.cmdFnctn);
		// lists all hosts
		this.app.get('/hosts', this.hostsFnctn);
		// kills the server and all connected clients
		this.app.get('/kill', this.killFnctn);
		this.server = this.app.listen(this.port);
	};
}
