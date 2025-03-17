import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { BooksModule } from './books/books.module';
import { CacheModule } from './cache/cache.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [ConfigModule, BooksModule, CacheModule, QueueModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
