import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';
@Injectable()
export class QueueService implements OnModuleInit, OnModuleDestroy {
  private connection: amqp.Connection;
  private channel: amqp.Channel;
  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    await this.connect();
  }
  async onModuleDestroy() {
    await this.channel?.close();
    await this.connection?.close();
  }

  async connect() {
    this.connection = await amqp.connect(
      this.configService.get('rabbitmq.url'),
    );
    this.channel = await this.connection.createChannel();

    //define queues
    await this.channel.assertQueue('review-processing', { durable: true });
    console.log('Connected to RabbitMQ');
  }

  async publishToQueue(queue: string, message: any) {
    return this.channel.sendToQueue(
      queue,
      Buffer.from(JSON.stringify(message)),
      {
        persistent: true,
      },
    );
  }
}
