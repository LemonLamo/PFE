const amqp = require('amqplib');
const logger = require('../utils/logger');

const MAX_RETRIES = 5;
const RETRY_INTERVAL = 10000; // 10 seconds in milliseconds

const config = {
    protocol: 'amqp',
    hostname: 'rabbitmq',
    port: 5672,
    username: 'guest',
    password: 'guest',
    vhost: '/',
}

class RabbitConnection {
    constructor() {
        this.connection = null;
        this.channel = null;
        this.isConnecting = false;
        this.connectPromise = null;
    }

    async connect() {
        if (this.connection && this.channel)
            return;

        if (this.isConnecting) {
            await this.connectPromise;
            return;
        }

        this.isConnecting = true;
        this.connectPromise = new Promise(async (resolve, reject) => {
            let attempt = 1;
            while (attempt <= MAX_RETRIES) {
                try {
                    this.connection = await amqp.connect(`${config.protocol}://${config.username}:${config.password}@${config.hostname}:${config.port}${config.vhost}`);
                    this.channel = await this.connection.createChannel();
                    this.isConnecting = false;

                    logger.info('[SERVER] RabbitMQ connection established...');
                    resolve();
                    return;
                } catch (error) {
                    attempt++;
                    await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL));
                }
            }
            process.exit(1);
        });

        return this.connectPromise;
    }

    async sendMsg(queue, message) {
        try {
            await this.connect();
            this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        } catch (error) {
            console.log(error);
        }
    }

    async on(queue, callback) {
        try {
            await this.connect();
            await this.channel.assertQueue(queue, { durable: true });
            this.channel.consume(queue, async (msg) => {
                await callback(JSON.parse(msg.content));
                this.channel.ack(msg);
            });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new RabbitConnection();
