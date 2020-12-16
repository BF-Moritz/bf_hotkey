const Client = require('./client.js');

// IP and PORT of the Server
const ip = 'yourIP';
const port = 12345;

// Name of this Client, all client names have to be unique, otherwise they will overwrite each other
const name = 'name';

async function main() {
	const client = new Client(ip, port, name);
	client.serve();

	await client.connect();

	while (client.reconnecting) {
		await new Promise((resolve) => setTimeout(resolve, client.reconnectingTime));
		console.log('Reconnecting...');
		await client.connect();
	}
}

main();
